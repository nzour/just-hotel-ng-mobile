import { ActivatedRouteSnapshot, Data, Resolve } from '@angular/router';
import { RoomOutput } from '../../shared/types/room';
import { RoomService } from '../services/room.service';
import { Guid } from '../../shared/types/manual';
import { RoomsInjectable } from '../rooms-services.module';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class BaseRoomResolver {
  protected extractRoomId(route: ActivatedRouteSnapshot): Guid {
    return route.params['roomId'];
  }
}

@RoomsInjectable()
export class RoomResolver extends BaseRoomResolver implements Resolve<RoomOutput> {

  constructor(private roomService: RoomService) {
    super();
  }

  resolve(route: ActivatedRouteSnapshot): Observable<RoomOutput> {
    return this.roomService.getRoom(this.extractRoomId(route));
  }
}

export interface RoomResolvedData extends Data {
  room: RoomOutput;
}
