import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { RoomComponent } from './components/room/room.component';


const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'rooms',
    component: RoomsComponent
  },
  {
    path: 'room/:id',
    component: RoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
