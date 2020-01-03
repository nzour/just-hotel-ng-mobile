import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { ModalController } from '@ionic/angular';
import { NotifierService } from "../../../shared/services/notifier.service";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent {

  constructor(
    private profileService: ProfileService,
    private modals: ModalController,
    private notifier: NotifierService
  ) {
  }

  private _passwordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    newPasswordReplica: new FormControl('', [Validators.required, this.arePasswordsEquals.bind(this)])
  });

  get passwordForm(): FormGroup {
    return this._passwordForm;
  }

  get passwordsNotEqual(): boolean {
    return this.hasError('newPasswordReplica', 'notEquals') && !this.hasError('newPasswordReplica', 'required');
  }

  async updatePassword(): Promise<void> {
    if (!this._passwordForm.valid) {
      await this.notifier.dispatchError('Не все данные заполены корректно!');
      return;
    }

    this.profileService
      .updatePassword(this._passwordForm.value)
      .subscribe(async () => await this.close());
  }

  hasError(controlName: string, errorCode: 'required' | 'minlength' | 'notEquals'): boolean {
    const control = this._passwordForm.get(controlName);

    if (!control || !control.dirty) {
      return false;
    }

    return control.hasError(errorCode);
  }

  async close(): Promise<void> {
    await this.modals.dismiss();
  }

  private arePasswordsEquals(control: FormControl): { notEquals: true } | null {
    if (!this._passwordForm) {
      return null;
    }

    const passwordControl = this._passwordForm.get('newPassword');

    if (!passwordControl) {
      return { notEquals: true };
    }

    return control.value !== passwordControl.value || !passwordControl.valid
      ? { notEquals: true }
      : null;
  }
}
