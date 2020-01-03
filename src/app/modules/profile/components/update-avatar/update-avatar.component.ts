import { Component, Input } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { PopoverController } from '@ionic/angular';
import { NotifierService } from '../../../shared/services/notifier.service';

@Component({
  selector: 'app-update-avatar',
  templateUrl: './update-avatar.component.html',
  styleUrls: ['./update-avatar.component.scss'],
})
export class UpdateAvatarComponent {

  /**
   * Base64 string of avatar image.
   */
  private _avatar?: string;

  constructor(
    public popovers: PopoverController,
    private profileService: ProfileService,
    private notifier: NotifierService
  ) { }

  get avatar(): string {
    if (!this._avatar) {
      throw new Error('Avatar has not been initialized');
    }

    return this._avatar;
  }

  @Input() set avatar(value: string) {
    this._avatar = value;
  }

  async confirm(): Promise<void> {
    if (!this._avatar) {
      await this.notifier.dispatchError('Avatar has not been initialized');
      return;
    }

    this.profileService
      .updateAvatar({ avatar: this._avatar })
      .subscribe(async () => await this.popovers.dismiss());
  }
}
