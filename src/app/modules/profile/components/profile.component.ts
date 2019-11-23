import { Component, OnInit } from '@angular/core';
import { ProfileOutput, ProfileService } from '../services/profile.service';
import { AlertController, IonRefresher } from '@ionic/angular';
import { TokenService } from '../../shared/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  private _profile?: ProfileOutput;

  constructor(
    private profileService: ProfileService,
    private tokenService: TokenService,
    private alerts: AlertController,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchProfileData();
  }

  get profile(): ProfileOutput | undefined {
    return this._profile;
  }

  async logout(): Promise<void> {
    const alert = await this.alerts.create({
      header: 'Вы действительно хотите выйти?',
      buttons: [
        {
          text: 'Подтвердить',
          handler: async () => {
            this.tokenService.clear();
            await this.router.navigate(['/auth'])
          }
        },
        'Отмена'
      ]
    });
    await alert.present();
  }

  fetchProfileData(): void {
    this.profileService.getProfile()
      .subscribe(output => this._profile = output);
  }

  async refreshProfileData(refresher: IonRefresher): Promise<void> {
    this.fetchProfileData();
    await refresher.complete();
  }
}
