import { Injectable, NgModule } from '@angular/core';

@NgModule()
export class AuthServicesModule {
}

export function AuthInjectable() {
  return Injectable({ providedIn: AuthServicesModule });
}
