import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomOutput } from '../../../shared/types/room';
import { RoomService } from '../../services/room.service';
import { RoomResolvedData } from '../../resolvers/room.resolver';
import { Observable } from 'rxjs';
import { RoomReservationResolvedData } from '../../resolvers/room-reservation.resolver';
import { ReservationOutput, ReservationService } from '../../services/reservation.service';
import { IonRefresher } from '@ionic/angular';

@Component({
  selector: 'app-rent-room',
  templateUrl: './rent-room.component.html',
  styleUrls: ['./rent-room.component.scss'],
})
export class RentRoomComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private reservationService: ReservationService
  ) { }

  private _room!: RoomOutput;

  get room(): RoomOutput {
    return this._room;
  }

  private _reservations = Array<ReservationOutput>();

  get reservations(): ReservationOutput[] {
    return this._reservations;
  }

  ngOnInit(): void {
    (this.route.data as Observable<RoomResolvedData & RoomReservationResolvedData>)
      .subscribe(data => {
        this._room = data.room;
        this._reservations = data.reservations;
      });
  }

  async refresh(refresher: IonRefresher): Promise<void> {
    await refresher.complete();
    await this.fetchRoom();
    await this.fetchReservations();
  }

  private async fetchRoom(): Promise<void> {
    this.roomService
      .getRoom(this._room.id)
      .subscribe(output => this._room = output);
  }

  private async fetchReservations(): Promise<void> {
    this.reservationService
      .getAllReservations({ roomId: this._room.id })
      .subscribe(output => this._reservations = output);
  }
}
