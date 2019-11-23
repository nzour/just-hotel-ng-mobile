import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoaderService } from './modules/shared/services/loader.service';
import { Observable } from 'rxjs';
import { TokenService } from './modules/shared/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loaderService: LoaderService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();
    this.statusBar.styleDefault();
    this.splashScreen.hide();

    await this.router.navigate(['main']);
  }

  get isLoading(): Observable<boolean> {
    return this.loaderService.isLoading;
  }

  get isAuthorized(): boolean {
    return this.tokenService.hasTokeInfo;
  }
}
