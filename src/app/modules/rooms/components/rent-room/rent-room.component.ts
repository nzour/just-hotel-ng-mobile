import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomOutput, ServiceOutput } from '../../../shared/types/room';
import { RoomService } from '../../services/room.service';
import { RoomResolvedData } from '../../resolvers/room.resolver';
import { Observable, Subscription } from 'rxjs';
import { RoomReservationResolvedData } from '../../resolvers/room-reservation.resolver';
import { ReservationOutput, ReservationService } from '../../services/reservation.service';
import { AlertController, IonRefresher } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarComponentOptions, DayConfig } from 'ion2-calendar';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Guid, Timestamp } from '../../../shared/types/manual';
import { ServicesResolvedData } from '../../resolvers/services.resolver';
import { Location } from '@angular/common';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-rent-room',
  templateUrl: './rent-room.component.html',
  styleUrls: ['./rent-room.component.scss'],
})
export class RentRoomComponent implements OnInit, OnDestroy {

  private _room?: RoomOutput;
  private _reservations = Array<ReservationOutput>();
  private _services = Array<ServiceOutput>();
  private _datePickerOptions: CalendarComponentOptions = {};
  private _subscription?: Subscription;

  private _reservationForm = new FormGroup({
    rentDates: new FormControl(null, [Validators.required]),
    services: new FormControl([])
  });

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService,
    private reservationService: ReservationService,
    private servicesService: ServicesService,
    private alerts: AlertController
  ) { }

  get room(): RoomOutput {
    if (!this._room) {
      throw new Error('Property \'room\' can\'t be uninitialized!');
    }

    return this._room;
  }

  get reservations(): ReservationOutput[] {
    return this._reservations;
  }

  get datePickerOptions(): CalendarComponentOptions {
    return this._datePickerOptions;
  }

  get reservationForm(): FormGroup {
    return this._reservationForm;
  }

  get services(): ServiceOutput[] {
    return this._services;
  }

  ngOnInit(): void {
    this._subscription = (this.route.data as Observable<RentRoomResolvedData>)
      .subscribe(data => {
        this._room = data.room;
        this._reservations = data.reservations;
        this._services = data.services.data;
        this._datePickerOptions = this.createDatepickerOptions(data.reservations);
      });
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  back(): void {
    this.location.back();
  }

  async openConfirmWindow(): Promise<void> {
    if (!this._reservationForm.valid || !this._room) {
      return;
    }

    const roomId = this._room.id;
    const { from, to } = this._reservationForm.get('rentDates')!.value as { from: Moment, to: Moment };
    const serviceIds = this._reservationForm.get('services')!.value as Guid[];

    const days = to.diff(from, 'days') + 1;
    const moneyForServices = this._services
      .filter(s => serviceIds.includes(s.id))
      .reduce((total, service) => total + service.cost, 0);

    const alert = await this.alerts
      .create({
        header: `Аренда обойдется вам в ${(this._room.cost + moneyForServices) * days} руб за ${days} суток`,
        buttons: [
          {
            text: 'Подтвердить',
            handler: () => this.createReservation(roomId, from.unix(), to.unix(), serviceIds)
          },
          'Отменить'
        ]
      });

    await alert.present();
  }

  async refresh(refresher: IonRefresher): Promise<void> {
    await refresher.complete();
    await this.fetchRoom();
    await this.fetchReservations();
    await this.fetchServices();
  }

  private createReservation(roomId: Guid, reservedFrom: Timestamp, reservedTo: Timestamp, serviceIds: Guid[]): void {
    this.reservationService
      .createReservation({ roomId, reservedFrom, reservedTo, serviceIds: serviceIds })
      .subscribe(async () => await this.router.navigate(['rooms']));
  }

  private async fetchRoom(): Promise<void> {
    if (!this._room) {
      await this.router.navigate(['rooms']);
      return;
    }

    this.roomService
      .getRoom(this._room.id)
      .subscribe(output => this._room = output);
  }

  private async fetchReservations(): Promise<void> {
    if (!this._room) {
      await this.router.navigate(['rooms']);
      return;
    }

    this.reservationService
      .getAllReservations({ roomId: this._room.id })
      .subscribe(output => this._reservations = output);
  }

  private async fetchServices(): Promise<void> {
    if (!this._room) {
      await this.router.navigate(['rooms']);
      return;
    }

    this.servicesService.getAllServices()
      .subscribe(output => this._services = output.data);
  }

  private createDatepickerOptions(reservations: ReservationOutput[]): CalendarComponentOptions {
    return {
      pickMode: 'range',
      daysConfig: [
        ...reservations.map(r => this.mapToDisabledDate(r.reservedTo)),
        ...reservations.map(r => this.mapToDisabledDate(r.reservedFrom)),
        this.mapToDisabledDate(moment().valueOf())
      ],
      monthPickerFormat: ['Янв', 'Февр', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Ноя', 'Дек']
    };
  }

  private mapToDisabledDate(ts: Timestamp): DayConfig {
    return {
      date: moment(ts).toDate(),
      disable: true
    };
  }
}

type RentRoomResolvedData = RoomResolvedData & RoomReservationResolvedData & ServicesResolvedData;
