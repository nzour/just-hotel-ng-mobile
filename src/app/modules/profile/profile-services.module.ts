import { Injectable, NgModule } from '@angular/core';


@NgModule()
export class ProfileServicesModule {
}

export function ProfileInjectable() {
  return Injectable({ providedIn: ProfileServicesModule });
}
