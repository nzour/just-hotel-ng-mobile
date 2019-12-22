import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { UserReservationComponent } from './components/user-reservation/user-reservation.component';
import { OnlyClientGuard } from '../rooms/guards/only-client.guard';


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  },
  {
    path: 'reservations',
    component: UserReservationComponent,
    canActivate: [OnlyClientGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
