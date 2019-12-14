import { Component } from '@angular/core';
import { RoomFilter, RoomService } from '../../services/room.service';
import { TokenService } from '../../../shared/services/token.service';
import { Pagination } from '../../../shared/types/pagination';
import { IonRefresher, ModalController } from '@ionic/angular';
import { RoomsFilterComponent } from '../rooms-filter/rooms-filter.component';
import { OverlayEventDetail } from '@ionic/core/dist/types/utils/overlays-interface';
import { RoomOutput } from '../../../shared/types/room';
import { RoomComponent } from '../room/room.component';
import { finalize, tap } from 'rxjs/operators';
import { IonWillEnter, IonWillLeave } from '../../../shared/types/ionic-hooks';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['../room-shared-styles.scss'],
})
export class RoomsComponent implements IonWillEnter, IonWillLeave {

  private _rooms = Array<RoomOutput>();
  private _pagination: Pagination = { limit: 5 };
  private _filter: RoomFilter = {};
  private _total = 0;
  private _loading = false;

  constructor(
    private roomService: RoomService,
    private tokenService: TokenService,
    private modals: ModalController
  ) { }

  ionViewWillEnter(): void {
    this.fetchRooms();
  }

  ionViewWillLeave(): void {
    this._rooms = [];
    this._total = 0;
    this._loading = false;
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

  get filter(): RoomFilter {
    return this._filter;
  }

  get isLoading(): boolean {
    return this._loading;
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
      this.fetchRooms();
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

  async refreshRooms(refresher: IonRefresher): Promise<void> {
    await refresher.complete();
    this.fetchRooms();
  }

  private fetchRooms(): void {
    this.roomService.getAllRooms(this._pagination, this._filter)
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
