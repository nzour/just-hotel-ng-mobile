import { Injectable, NgModule } from '@angular/core';

@NgModule()
export class SharedServiceModule {
}

export function RootInjectable() {
  return Injectable({ providedIn: 'root' });
}

export function SharedInjectable() {
  return Injectable({ providedIn: SharedServiceModule });
}
