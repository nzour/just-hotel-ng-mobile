import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HasNotTokenGuard } from './modules/shared/guards/has-not-token.guard';
import { AuthModule } from './modules/auth/auth.module';
import { environment } from '../environments/environment';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
      },
      {
        path: 'auth',
        loadChildren: () => AuthModule,
        canActivate: [HasNotTokenGuard]
      },
      // {
      //   path: 'main',
      //   canActivate: [HasTokenGuard]
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', enableTracing: environment.enableRoutingTracing })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
