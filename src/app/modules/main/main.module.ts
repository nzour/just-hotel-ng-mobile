import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { MainServicesModule } from './main-services.module';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { RoomComponent } from './components/room/room.component';
import { RoomsFilterComponent } from './components/rooms-filter/rooms-filter.component';
import { SkeletonModule } from '../skeleton/skeleton.module';


@NgModule({
  declarations: [
    MainPageComponent,
    RoomsComponent,
    RoomComponent,
    RoomsFilterComponent
  ],
  entryComponents: [
    RoomsFilterComponent
  ],
  imports: [
    SharedModule,
    SkeletonModule,
    MainRoutingModule,
    MainServicesModule
  ]
})
export class MainModule {
}
