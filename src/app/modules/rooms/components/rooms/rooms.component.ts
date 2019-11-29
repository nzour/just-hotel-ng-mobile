import { Component, OnInit } from '@angular/core';
import { RoomFilter, RoomService } from '../../services/room.service';
import { TokenService } from '../../../shared/services/token.service';
import { TokenInfo } from '../../../shared/types/manual';
import { Pagination } from '../../../shared/types/pagination';
import { IonRefresher, ModalController } from '@ionic/angular';
import { RoomsFilterComponent } from '../rooms-filter/rooms-filter.component';
import { OverlayEventDetail } from '@ionic/core/dist/types/utils/overlays-interface';
import { RoomOutput } from '../../../shared/types/room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['../room-shared-styles.scss'],
})
export class RoomsComponent implements OnInit {

  private _rooms = Array<RoomOutput>();
  private _loggedUser?: TokenInfo;
  private _pagination: Pagination = { limit: 5 };
  private _total?: number;
  private _filter: RoomFilter = {};

  constructor(
    private roomService: RoomService,
    private tokenService: TokenService,
    private modals: ModalController
  ) { }

  get rooms(): RoomOutput[] {
    return this._rooms;
  }

  get total(): number | undefined {
    return this._total;
  }

  get filter(): RoomFilter {
    return this._filter;
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

    if (filter) {
      this._filter.roomTypes = filter.roomTypes;
    }

    this.fetchRooms();
  }

  async openRoomPage(room: RoomOutput): Promise<void> {
    const modal = await this.modals
      .create({
        component: RoomsComponent,
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
