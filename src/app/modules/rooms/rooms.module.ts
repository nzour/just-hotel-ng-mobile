import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsRoutingModule } from './rooms-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RoomsComponent } from './components/rooms/rooms.component';
import { RoomsFilterComponent } from './components/rooms-filter/rooms-filter.component';
import { RoomComponent } from './components/room/room.component';
import { RoomsServicesModule } from './rooms-services.module';
import { RoomActionButtonsComponent } from './components/room-action-buttons/room-action-buttons.component';
import { ManageRoomComponent } from './components/manage-room/manage-room.component';
import { RentRoomComponent } from './components/rent-room/rent-room.component';
import { CreateRoomComponent } from './components/create-room/create-room.component';
import { LinksPopoverComponent } from './components/links-popover/links-popover.component';

@NgModule({
  declarations: [
    RoomComponent,
    RoomsComponent,
    RoomsFilterComponent,
    RoomActionButtonsComponent,
    ManageRoomComponent,
    RentRoomComponent,
    CreateRoomComponent,
    LinksPopoverComponent
  ],
  entryComponents: [
    RoomComponent,
    RoomsFilterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RoomsRoutingModule,
    RoomsServicesModule
  ]
})
export class RoomsModule {
}
