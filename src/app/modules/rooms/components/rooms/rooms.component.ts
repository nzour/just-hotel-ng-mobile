import { Component } from '@angular/core';
import { RoomFilter, RoomService } from '../../services/room.service';
import { TokenService } from '../../../shared/services/token.service';
import { Pagination } from '../../../shared/types/pagination';
import { IonInfiniteScroll, IonRefresher, ModalController, PopoverController } from '@ionic/angular';
import { RoomsFilterComponent } from '../rooms-filter/rooms-filter.component';
import { OverlayEventDetail } from '@ionic/core/dist/types/utils/overlays-interface';
import { RoomOutput } from '../../../shared/types/room';
import { RoomComponent } from '../room/room.component';
import { finalize, tap } from 'rxjs/operators';
import { IonWillEnter, IonWillLeave } from '../../../shared/types/ionic-hooks';
import { Links, LinksPopoverComponent } from '../links-popover/links-popover.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['../room-shared-styles.scss'],
})
export class RoomsComponent implements IonWillEnter, IonWillLeave {

  private readonly CHUNK_SIZE = 3;
  private _rooms = Array<RoomOutput>();
  private _pagination: Pagination = { limit: this.CHUNK_SIZE };
  private _filter: RoomFilter = {};
  private _total = 0;
  private _loading = true;

  constructor(
    private roomService: RoomService,
    private tokenService: TokenService,
    private modals: ModalController,
    private popovers: PopoverController
  ) { }

  ionViewWillEnter(): void {
    this.fetchRooms(this._pagination);
  }

  ionViewWillLeave(): void {
    this._rooms = [];
    this._total = 0;
    this._loading = true;
    this._pagination = { limit: this.CHUNK_SIZE };
  }

  get isManager(): boolean {
    const tokenInfo = this.tokenService.tryGetTokenInfo;
    return !!tokenInfo && 'Manager' === tokenInfo.role;
  }

  get rooms(): RoomOutput[] {
    return this._rooms;
  }

  get total(): number {
    return this._total;
  }

  get isLoading(): boolean {
    return this._loading;
  }

  get countPerPageTitle(): string {
    if (this._rooms.length === this._total) {
      return String(this._total);
    }

    return `${this._rooms.length} из ${this._total}`;
  }

  async loadMoreData(scroll: IonInfiniteScroll): Promise<void> {
    const difference = (this._total - this._rooms.length) + this.CHUNK_SIZE;
    const offset = difference < this.CHUNK_SIZE ? difference : this.CHUNK_SIZE;

    if (this._pagination.offset) {
      this._pagination.offset += offset;
    } else {
      this._pagination.offset = offset;
    }

    const { total, data } = await this.roomService
      .getAllRooms(this._pagination, this._filter)
      .pipe(
        tap(() => this._loading = true),
        finalize(() => this._loading = false)
      )
      .toPromise();

    this._total = total;
    this._rooms.push(...data);

    await scroll.complete();
  }

  async openFilters(): Promise<void> {
    const modal = await this.modals
      .create({
        component: RoomsFilterComponent,
        componentProps: {
          filter: this._filter
        }
      });

    await modal.present();

    const returnedDataFromModal: OverlayEventDetail<RoomFilter> = await modal.onWillDismiss();
    const filter = returnedDataFromModal.data;

    if (filter && filter.roomTypes !== this._filter.roomTypes) {
      this._filter.roomTypes = filter.roomTypes;
      this._pagination = { limit: this.CHUNK_SIZE };
      this.fetchRooms(this._pagination);
    }
  }

  async openRoomPage(room: RoomOutput): Promise<void> {
    const modal = await this.modals
      .create({
        component: RoomComponent,
        componentProps: { room }
      });

    await modal.present();
  }

  async openCreatePopover(): Promise<void> {
    const links: Links = [
      {
        text: 'Создать номер',
        color: 'primary',
        navigateTo: ['rooms', 'create']
      },
      {
        text: 'Создать услугу',
        color: 'primary',
        navigateTo: ['rooms', 'services', 'create']
      }
    ];

    const popover = await this.popovers.create({
      component: LinksPopoverComponent,
      componentProps: { links }
    });

    await popover.present();
  }

  async refreshRooms(refresher: IonRefresher): Promise<void> {
    await refresher.complete();
    this._pagination = { limit: this.CHUNK_SIZE };
    this.fetchRooms(this._pagination);
  }

  private fetchRooms(pagination: Pagination): void {
    this.roomService.getAllRooms(pagination, this._filter)
      .pipe(
        tap(() => this._loading = true),
        finalize(() => this._loading = false)
      )
      .subscribe(({ total, data }) => {
        this._total = total;
        this._rooms = data;
      });
  }
}
