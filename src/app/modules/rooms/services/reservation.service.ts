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
}

export interface ReservationFilter {
  userId?: Guid,
  roomId?: Guid
}

export interface ReservationOutput {
  id: Guid,
  user: UserOutput,
  room: RoomOutput,
  reservedFrom: Timestamp,
  reservedTo: Timestamp,
  cost: number,
  service: ServiceOutput[]
}
