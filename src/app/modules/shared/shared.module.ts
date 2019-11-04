import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedServiceModule } from './shared-service.module';
import { IonicModule } from '@ionic/angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiInterceptor } from './interceptors/api.interceptor';

@NgModule({
  declarations: [],
  imports: [
    IonicModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SharedServiceModule
  ],
  exports: [
    IonicModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SharedServiceModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
  ]
})
export class SharedModule {
}
