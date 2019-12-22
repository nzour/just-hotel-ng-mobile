import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileServicesModule } from './profile-services.module';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdateNamesComponent } from './components/update-names/update-names.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { UserReservationComponent } from './components/user-reservation/user-reservation.component';


@NgModule({
  declarations: [
    ProfileComponent,
    UpdateNamesComponent,
    UpdatePasswordComponent,
    UserReservationComponent
  ],
  entryComponents: [
    UpdateNamesComponent,
    UpdatePasswordComponent
  ],
  imports: [
    SharedModule,
    ProfileRoutingModule,
    ProfileServicesModule
  ]
})
export class ProfileModule {
}
