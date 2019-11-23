import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsRoutingModule } from './rooms-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RoomsComponent } from './components/rooms/rooms.component';
import { RoomsFilterComponent } from './components/rooms-filter/rooms-filter.component';
import { RoomComponent } from './components/room/room.component';
import { RoomsServicesModule } from './rooms-services.module';

@NgModule({
  declarations: [
    RoomComponent,
    RoomsComponent,
    RoomsFilterComponent,
  ],
  entryComponents: [RoomsFilterComponent],
  imports: [
    CommonModule,
    SharedModule,
    RoomsRoutingModule,
    RoomsServicesModule
  ]
})
export class RoomsModule { }
