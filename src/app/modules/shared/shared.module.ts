import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedServiceModule } from './shared-service.module';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    SharedServiceModule
  ]
})
export class SharedModule { }
