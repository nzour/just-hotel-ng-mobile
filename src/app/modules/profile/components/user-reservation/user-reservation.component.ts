import { Component, OnInit } from '@angular/core';
import { ReservationOutput } from '../../../rooms/services/reservation.service';
import { ProfileService } from '../../services/profile.service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { IonRefresher } from '@ionic/angular';

@Component({
  selector: 'app-user-reservation',
  templateUrl: './user-reservation.component.html',
  styleUrls: ['./user-reservation.component.scss'],
})
export class UserReservationComponent implements OnInit {

  private _reservations = Array<ReservationOutput>();
  private _processing = true;

  constructor(private profileService: ProfileService, private location: Location) { }

  ngOnInit() {
    this.fetchReservations();
  }

  get reservations(): ReservationOutput[] {
    return this._reservations;
  }

  get isProcessing(): boolean {
    return this._processing;
  }

  async refresh(refresher: IonRefresher): Promise<void> {
    await refresher.complete();
    this.fetchReservations();
  }

  fetchReservations(): void {
    this.profileService
      .getCurrentUserReservations()
      .pipe(
        tap(() => this._processing = true),
        finalize(() => this._processing = false),
        catchError(error => {
          this.location.back();
          throw error;
        })
      )
      .subscribe(output => this._reservations = output);
  }
}
