import { Pipe, PipeTransform } from '@angular/core';
import { RoomType } from '../types/room';

@Pipe({
  name: 'translateRoomType'
})
export class RoomTypePipe implements PipeTransform {

  transform(roomType: RoomType): string {
    switch (roomType) {
      case 'Single':
        return 'Однокомнатная';

      case 'Double':
        return 'Двухкомнатная';

      case 'Triple':
        return 'Трехкомнатная';
    }
  }

}
