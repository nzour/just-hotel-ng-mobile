import { Component } from '@angular/core';
import { ProfileOutput, ProfileService } from '../../services/profile.service';
import { AlertController, IonRefresher, ModalController } from '@ionic/angular';
import { TokenService } from '../../../shared/services/token.service';
import { Router } from '@angular/router';
import { UpdateNamesComponent } from '../update-names/update-names.component';
import { UpdatePasswordComponent } from '../update-password/update-password.component';
import { delay } from 'rxjs/operators';
import { IonDidLeave, IonWillEnter } from '../../../shared/types/ionic-hooks';
import { ImagePicker, ImagePickerOptions, OutputType } from "@ionic-native/image-picker/ngx";
import { firstOrDefault } from "../../../shared/utils/functional";

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
    private imagePicker: ImagePicker
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
    const options: ImagePickerOptions = {
      allow_video: false,
      maximumImagesCount: 1,
      outputType: OutputType.DATA_URL
    };

    const base64Images: string[] = await this.imagePicker.getPictures(options);

    const pickedImage = firstOrDefault(base64Images);
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
