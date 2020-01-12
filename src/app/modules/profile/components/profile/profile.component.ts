import { Component } from '@angular/core';
import { ProfileOutput, ProfileService } from '../../services/profile.service';
import { AlertController, IonRefresher, ModalController, PopoverController } from '@ionic/angular';
import { TokenService } from '../../../shared/services/token.service';
import { Router } from '@angular/router';
import { UpdateNamesComponent } from '../update-names/update-names.component';
import { UpdatePasswordComponent } from '../update-password/update-password.component';
import { delay } from 'rxjs/operators';
import { IonDidLeave, IonWillEnter } from '../../../shared/types/ionic-hooks';
import { defaultAvatar } from '../../../shared/utils/constants/default-avatar';
import { NotifierService } from '../../../shared/services/notifier.service';
import { UpdateAvatarComponent } from '../update-avatar/update-avatar.component';
import { PictureLoaderService } from '../../../shared/services/picture-loader.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements IonWillEnter, IonDidLeave {

  private _profile?: ProfileOutput;

  constructor(
    private profileService: ProfileService,
    private tokenService: TokenService,
    private alerts: AlertController,
    private modals: ModalController,
    private router: Router,
    private notifier: NotifierService,
    private popovers: PopoverController,
    private pictureLoader: PictureLoaderService
  ) {
  }

  ionViewWillEnter(): void {
    this.profileService
      .getProfile()
      .pipe(
        // Слишком быстро отправляется запрос, токен не успевает сохраниться в локал стораге при авторизации.
        delay(500)
      )
      .subscribe(output => this._profile = output);
  }

  ionViewDidLeave(): void {
    this._profile = undefined;
  }

  get profile(): ProfileOutput | undefined {
    return this._profile;
  }

  get avatar(): string {
    return this.profile && this.profile.avatar
      ? this.profile.avatar
      : defaultAvatar;
  }

  async logout(): Promise<void> {
    const alert = await this.alerts.create({
      header: 'Вы действительно хотите выйти?',
      buttons: [
        {
          text: 'Подтвердить',
          handler: async () => {
            this.tokenService.clear();
            await this.router.navigate(['/auth']);
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

  async changeImage(): Promise<void> {
    const avatar = await this.pictureLoader.loadOneImage();

    const popover = await this.popovers
      .create({
        component: UpdateAvatarComponent,
        componentProps: { avatar }
      });

    popover.onDidDismiss().then(() => this.fetchProfileData());
    await popover.present();
  }

  async refreshProfileData(refresher: IonRefresher): Promise<void> {
    this.fetchProfileData();
    await refresher.complete();
  }

  async openUpdateNamesDialog(): Promise<void> {
    if (!this.profile) {
      return;
    }

    const modal = await this.modals.create({
      component: UpdateNamesComponent,
      componentProps: {
        names: {
          firstName: this.profile.firstName,
          lastName: this.profile.lastName
        }
      }
    });

    modal.onWillDismiss().then(() => this.fetchProfileData());
    await modal.present();
  }

  async openUpdatePasswordDialog(): Promise<void> {
    const modal = await this.modals.create({
      component: UpdatePasswordComponent
    });

    await modal.present();
  }
}
