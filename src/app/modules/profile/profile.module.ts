import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileServicesModule } from './profile-services.module';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdateNamesComponent } from './components/update-names/update-names.component';


@NgModule({
  declarations: [
    ProfileComponent,
    UpdateNamesComponent
  ],
  entryComponents: [
    UpdateNamesComponent
  ],
  imports: [
    SharedModule,
    ProfileRoutingModule,
    ProfileServicesModule
  ]
})
export class ProfileModule {
}
