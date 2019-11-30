import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './components/rooms/rooms.component';
import { ManageRoomComponent } from './components/manage-room/manage-room.component';
import { OnlyManagerGuard } from './guards/only-manager.guard';
import { RentRoomComponent } from './components/rent-room/rent-room.component';
import { OnlyClientGuard } from './guards/only-client.guard';
import { RoomResolver } from './resolvers/room.resolver';
import { RoomReservationResolver } from './resolvers/room-reservation.resolver';
import { CreateRoomComponent } from './components/create-room/create-room.component';

const routes: Routes = [
  {
    path: '',
    component: RoomsComponent
  },
  {
    path: 'create',
    component: CreateRoomComponent,
    canActivate: [OnlyManagerGuard]
  },
  {
    path: ':roomId/manage',
    component: ManageRoomComponent,
    canActivate: [OnlyManagerGuard]
  },
  {
    path: ':roomId/rent',
    component: RentRoomComponent,
    canActivateChild: [OnlyClientGuard],
    resolve: {
      room: RoomResolver,
      reservations: RoomReservationResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule {
}
