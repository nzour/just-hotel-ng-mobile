import { Component, OnInit } from '@angular/core';
import { RoomInputFilter, RoomOutput, RoomService } from '../../services/room.service';
import { TokenService } from '../../../shared/services/token.service';
import { TokenInfo } from '../../../shared/types/manual';
import { Pagination } from '../../../shared/types/pagination';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {

  private _pagination: Pagination = { limit: 5 };

  constructor(private roomService: RoomService, private tokeService: TokenService) { }

  private _rooms = Array<RoomOutput>();

  get rooms(): RoomOutput[] {
    return this._rooms;
  }

  private _loggedUser?: TokenInfo;

  get loggedUser(): TokenInfo | undefined {
    return this._loggedUser;
  }

  private _total?: number;

  get total(): number | undefined {
    return this._total;
  }

  private _filter: RoomInputFilter = {};

  get filter(): RoomInputFilter {
    return this._filter;
  }

  ngOnInit() {
    this.fetchRooms();
    this._loggedUser = this.tokeService.tryGetTokenInfo;
  }

  private fetchRooms(): void {
    this.roomService.getAllRooms(this._pagination, this._filter)
      .subscribe(response => {
        this._total = response.total;
        this._rooms = response.data;
      });
  }
}
