import { Component, OnInit } from '@angular/core';
import { RoomInputFilter, RoomService } from '../../services/room.service';
import { TokenService } from '../../../shared/services/token.service';
import { TokenInfo } from '../../../shared/types/manual';
import { Pagination } from '../../../shared/types/pagination';
import { ModalController } from '@ionic/angular';
import { RoomsFilterComponent } from '../rooms-filter/rooms-filter.component';
import { OverlayEventDetail } from '@ionic/core/dist/types/utils/overlays-interface';
import { RoomOutput } from '../../../shared/types/room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {

  private _rooms = Array<RoomOutput>();
  private _loggedUser?: TokenInfo;
  private _pagination: Pagination = { limit: 5 };
  private _total?: number;
  private _filter: RoomInputFilter = {};

  constructor(
    private roomService: RoomService,
    private tokeService: TokenService,
    private modals: ModalController
  ) { }

  ngOnInit() {
    this.fetchRooms();
    this._loggedUser = this.tokeService.tryGetTokenInfo;
  }

  get rooms(): RoomOutput[] {
    return this._rooms;
  }

  get loggedUser(): TokenInfo | undefined {
    return this._loggedUser;
  }

  get total(): number | undefined {
    return this._total;
  }

  get filter(): RoomInputFilter {
    return this._filter;
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
    const { data }: OverlayEventDetail<RoomInputFilter> = await modal.onWillDismiss();

    if (data) {
      this._filter.isRented = data.isRented;
      this._filter.roomTypes = data.roomTypes;
    }

    this.fetchRooms();
  }

  private fetchRooms(): void {
    this.roomService.getAllRooms(this._pagination, this._filter)
      .subscribe(({ data, total }) => {
        this._total = total;
        this._rooms = data;
      });
  }
}
