import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedServiceModule } from './shared-service.module';
import { IonicModule } from '@ionic/angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { CountablePipe } from './pipes/countable.pipe';
import { RolePipe } from './pipes/role.pipe';
import { RoomTypePipe } from './pipes/room-type.pipe';
import { FooterButtonsComponent } from './components/footer-buttons/footer-buttons.component';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { CalendarModule } from 'ion2-calendar';
import { TsToDatePipe } from './pipes/ts-to-date.pipe';
import { AppTitleComponent } from "./components/app-title/app-title.component";

const declarations = [
  RolePipe,
  CountablePipe,
  RoomTypePipe,
  TsToDatePipe,
  FooterButtonsComponent,
  AppTitleComponent
];

@NgModule({
  declarations,
  imports: [
    IonicModule,
    Ionic4DatepickerModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SharedServiceModule
  ],
  exports: [
    IonicModule,
    Ionic4DatepickerModule,
    CalendarModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SharedServiceModule,
    ...declarations
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
  ]
})
export class SharedModule {
}
