import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit {

  constructor(private profileService: ProfileService, private modals: ModalController) { }

  private _passwordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  get passwordForm(): FormGroup {
    return this._passwordForm;
  }

  get passwordsNotEqual(): boolean {
    return this.hasError('newPasswordReplica', 'notEquals') && !this.hasError('newPasswordReplica', 'required');
  }

  ngOnInit(): void {
    this._passwordForm.addControl(
      'newPasswordReplica', new FormControl('', [Validators.required, this.arePasswordsEquals.bind(this)])
    );
  }

  updatePassword(): void {
    if (!this._passwordForm.valid) {
      return;
    }

    this.profileService
      .updatePassword(this._passwordForm.value)
      .subscribe(async () => await this.close());
  }

  hasError(controlName: string, validation: 'required' | 'minlength' | 'notEquals'): boolean {
    const control = this._passwordForm.get(controlName);

    if (!control || !control.dirty) {
      return false;
    }

    return control.hasError(validation);
  }

  async close(): Promise<void> {
    await this.modals.dismiss();
  }

  private arePasswordsEquals(control: FormControl): { notEquals: true } | null {
    const passwordControl = this._passwordForm.get('newPassword');

    if (!passwordControl) {
      return { notEquals: true };
    }

    return control.value !== passwordControl.value || !passwordControl.valid
      ? { notEquals: true }
      : null;
  }
}
