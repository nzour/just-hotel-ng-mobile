import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountablePipe } from './pipes/countable.pipe';
import { SkeletonTextComponent } from './components/skeleton-text/skeleton-text.component';
import { SkeletonAvatarComponent } from './components/skeleton-avatar/skeleton-avatar.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    CountablePipe,
    SkeletonTextComponent,
    SkeletonAvatarComponent
  ],
  exports: [
    CountablePipe,
    SkeletonTextComponent,
    SkeletonAvatarComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class SkeletonModule { }
