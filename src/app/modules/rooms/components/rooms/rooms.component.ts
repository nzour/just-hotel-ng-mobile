import { Component, OnInit } from '@angular/core';
import { RoomFilter, RoomService } from '../../services/room.service';
import { TokenService } from '../../../shared/services/token.service';
import { TokenInfo } from '../../../shared/types/manual';
import { Pagination } from '../../../shared/types/pagination';
import { IonRefresher, ModalController } from '@ionic/angular';
import { RoomsFilterComponent } from '../rooms-filter/rooms-filter.component';
import { OverlayEventDetail } from '@ionic/core/dist/types/utils/overlays-interface';
import { RoomOutput } from '../../../shared/types/room';
import { Observable } from 'rxjs';
import { LoaderService } from '../../../shared/services/loader.service';
import { RoomComponent } from '../room/room.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['../room-shared-styles.scss'],
})
export class RoomsComponent implements OnInit {

  private _rooms = Array<RoomOutput>();
  private _loggedUser?: TokenInfo;
  private _pagination: Pagination = { limit: 5 };
  constructor(
    private roomService: RoomService,
    private tokenService: TokenService,
    private modals: ModalController,
    private loader: LoaderService
  ) { }

  private _filter: RoomFilter = {};

  private _total = 0;

  get rooms(): RoomOutput[] {
    return this._rooms;
  }

  get total(): number {
    return this._total;
  }

  get filter(): RoomFilter {
    return this._filter;
  }

  get isLoading(): Observable<boolean> {
    return this.loader.isLoading;
  }

  ngOnInit() {
    this.fetchRooms();
    this._loggedUser = this.tokenService.tryGetTokenInfo;
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
      .subscribe(({ total, data }) => {
        this._total = total;
        this._rooms = data;
      });
  }
}
