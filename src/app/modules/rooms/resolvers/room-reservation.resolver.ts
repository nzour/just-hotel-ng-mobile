import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ReservationOutput, ReservationService } from '../services/reservation.service';
import { RoomsInjectable } from '../rooms-services.module';
import { BaseRoomResolver } from './room.resolver';
import { Observable } from 'rxjs';

@RoomsInjectable()
export class RoomReservationResolver extends BaseRoomResolver implements Resolve<ReservationOutput[]> {

  constructor(private reservationService: ReservationService) {
    super();
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ReservationOutput[]> {
    return this.reservationService
      .getAllReservations({ roomId: this.extractRoomId(route) });
  }
}

export interface RoomReservationResolvedData {
  reservations: ReservationOutput[];
}
