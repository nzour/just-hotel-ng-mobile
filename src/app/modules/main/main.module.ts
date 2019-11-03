import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { MainServicesModule } from './main-services.module';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { RoomComponent } from './components/room/room.component';


@NgModule({
  declarations: [
    MainPageComponent,
    RoomsComponent,
    RoomComponent
  ],
  imports: [
    SharedModule,
    MainRoutingModule,
    MainServicesModule
  ]
})
export class MainModule {
}
