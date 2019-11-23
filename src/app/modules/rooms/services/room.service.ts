import { HttpClient } from '@angular/common/http';
import { PaginatedData, Pagination } from '../../shared/types/pagination';
import { Guid } from '../../shared/types/manual';
import { Observable } from 'rxjs';
import { urlParams } from '../../shared/utils/functional';
import { RoomsInjectable } from '../rooms-services.module';
import { RoomOutput, RoomType } from '../../shared/types/room';

@RoomsInjectable()
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

// endregion
