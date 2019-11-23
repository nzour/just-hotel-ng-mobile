import { Injectable, NgModule } from '@angular/core';

@NgModule()
export class RoomsServicesModule {
}

export function RoomsInjectable() {
  return Injectable({ providedIn: RoomsServicesModule });
}
