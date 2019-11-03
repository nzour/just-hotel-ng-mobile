import { Injectable, NgModule } from '@angular/core';


@NgModule()
export class MainServicesModule {
}

export function MainInjectable() {
  return Injectable({ providedIn: MainServicesModule });
}
