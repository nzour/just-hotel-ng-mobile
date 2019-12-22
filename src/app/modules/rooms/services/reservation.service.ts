import { RoomsInjectable } from '../rooms-services.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlParams } from '../../shared/utils/functional';
import { Guid, Timestamp, UserOutput } from '../../shared/types/manual';
import { RoomOutput, ServiceOutput } from '../../shared/types/room';

@RoomsInjectable()
export class ReservationService {

  constructor(private http: HttpClient) { }

  getAllReservations(filter?: ReservationFilter): Observable<ReservationOutput[]> {
    return this.http.get<ReservationOutput[]>(`reservations${urlParams(filter)}`);
  }

  createReservation(input: ReservationInput): Observable<void> {
    return this.http.post<void>('reservations', input);
  }
}

export interface ReservationFilter {
  userId?: Guid,
  roomId?: Guid
}

export interface ReservationInput {
  roomId: Guid,
  reservedFrom: Timestamp,
  reservedTo: Timestamp,
  serviceIds: Guid[]
}

export interface ReservationOutput {
  id: Guid,
  user: UserOutput,
  room: RoomOutput,
  reservedFrom: Timestamp,
  reservedTo: Timestamp,
  cost: number,
  services: ServiceOutput[]
}
