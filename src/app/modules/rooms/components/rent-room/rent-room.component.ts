import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomOutput } from '../../../shared/types/room';
import { RoomService } from '../../services/room.service';
import { RoomResolvedData } from '../../resolvers/room.resolver';
import { Observable } from 'rxjs';
import { RoomReservationResolvedData } from '../../resolvers/room-reservation.resolver';
import { ReservationOutput, ReservationService } from '../../services/reservation.service';
import { IonRefresher } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarComponentOptions } from 'ion2-calendar';

@Component({
  selector: 'app-rent-room',
  templateUrl: './rent-room.component.html',
  styleUrls: ['./rent-room.component.scss'],
})
export class RentRoomComponent implements OnInit {

  private _room!: RoomOutput;
  private _reservations = Array<ReservationOutput>();
  private _datePickerConfig: object = {};

  private _reservationForm = new FormGroup({
    rentDate: new FormControl(null, [Validators.required])
  });

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private reservationService: ReservationService
  ) { }

  get room(): RoomOutput {
    return this._room;
  }

  get reservations(): ReservationOutput[] {
    return this._reservations;
  }

  get datePickerConfig(): object {
    return this._datePickerConfig;
  }

  get datePickerOptions(): CalendarComponentOptions {
    return {
      pickMode: 'range'
    };
  }

  get reservationForm(): FormGroup {
    return this._reservationForm;
  }

  ngOnInit(): void {
    (this.route.data as Observable<RoomResolvedData & RoomReservationResolvedData>)
      .subscribe(data => {
        this._room = data.room;
        this._reservations = data.reservations;
        this._datePickerConfig = this.createConfig(data.reservations);
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

  private createConfig(reservations: ReservationOutput[]): object {
    return {
      mondayFirst: true,
      setLabel: 'Выбрать',
      todayLabel: 'Сегодня',
      closeLabel: 'Отмена',
      titleLabel: 'Дата бронирования',
      clearButton: false,
      disabledDates: [...reservations.map(r => r.reservedFrom), ...reservations.map(r => r.reservedTo)],
      monthsList: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Окрябрь', 'Ноябрь', 'Декабрь'],
      weeksList: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    };
  }
}
