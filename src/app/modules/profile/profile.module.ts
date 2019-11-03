import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileServicesModule } from './profile-services.module';
import { ProfileComponent } from './components/profile.component';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    SharedModule,
    ProfileRoutingModule,
    ProfileServicesModule
  ]
})
export class ProfileModule {
}
