import { HttpClient } from '@angular/common/http';
import { PaginatedData, Pagination } from '../../shared/types/pagination';
import { Guid, UserOutput } from '../../shared/types/manual';
import { Observable } from 'rxjs';
import { MainInjectable } from '../main-services.module';
import { urlParams } from '../../shared/utils/functional';

@MainInjectable()
export class RoomService {

  constructor(private http: HttpClient) { }

  getRoom(roomId: Guid): Observable<RoomOutput> {
    return this.http.get<RoomOutput>(`rooms/${roomId}`);
  }

  getAllRooms(pagination: Pagination, filter?: RoomInputFilter): Observable<PaginatedData<RoomOutput>> {
    return this.http
      .get<PaginatedData<RoomOutput>>(`rooms${urlParams(pagination, filter)}`);
  }
}

// region types

export interface RoomInputFilter {
  isRented?: boolean | null;
  roomTypes?: RoomType[];
}

export interface RoomOutput {
  id: Guid;
  roomType: RoomType;
  cost: number;
  isRented: boolean;
}

export type RoomWithEmployeeOutput = RoomOutput & {
  employees: UserOutput[];
}

export type RoomType = 'Single' | 'Double' | 'Triple';

// endregion
