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

  getAllRooms(pagination: Pagination, filter?: RoomFilter): Observable<PaginatedData<RoomOutput>> {
    return this.http
      .get<PaginatedData<RoomOutput>>(`rooms${urlParams(pagination, filter)}`);
  }

  createRoom(input: RoomInput): Observable<void> {
    return this.http.post<void>('rooms', input);
  }

  updateRoom(input: RoomInput & { id: Guid }): Observable<void> {
    return this.http.put<void>(`rooms/${input.id}`, input);
  }
}

// region types

export interface RoomFilter {
  roomTypes?: RoomType[];
}

export interface RoomInput {
  roomType: RoomType;
  cost: number;
}

// endregion
