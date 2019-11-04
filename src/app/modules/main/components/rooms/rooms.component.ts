import { Component, OnInit } from '@angular/core';
import { RoomInputFilter, RoomOutput, RoomService } from '../../services/room.service';
import { TokenService } from '../../../shared/services/token.service';
import { TokenInfo } from '../../../shared/types/manual';
import { Pagination } from '../../../shared/types/pagination';
import { ModalController } from '@ionic/angular';
import { RoomsFilterComponent } from '../rooms-filter/rooms-filter.component';

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
  private _filter: RoomInputFilter = { isRented: false };

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
    await this.modals
      .create({
        component: RoomsFilterComponent,
        componentProps: {
          filter: this._filter
        }
      })
      .then(async (modal: HTMLIonModalElement) => {
        await modal.present();
      });
  }

  private fetchRooms(): void {
    this.roomService.getAllRooms(this._pagination, this._filter)
      .subscribe(response => {
        this._total = response.total;
        this._rooms = response.data;
      });
  }
}
