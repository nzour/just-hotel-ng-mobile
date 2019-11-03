import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HasNotTokenGuard } from './modules/shared/guards/has-not-token.guard';
import { AuthModule } from './modules/auth/auth.module';
import { environment } from '../environments/environment';
import { MainModule } from './modules/main/main.module';
import { ProfileModule } from './modules/profile/profile.module';
import { HasTokenGuard } from './modules/shared/guards/has-token.guard';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
      },
      {
        path: 'main',
        loadChildren: () => MainModule
      },
      {
        path: 'auth',
        loadChildren: () => AuthModule,
        canActivate: [HasNotTokenGuard]
      },
      {
        path: 'profile',
        loadChildren: () => ProfileModule,
        canActivate: [HasTokenGuard],
        canActivateChild: [HasTokenGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', enableTracing: environment.enableRoutingTracing })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
