import { Component, Input } from '@angular/core';
import { ProfileService, UpdateNamesInput } from '../../services/profile.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { NotifierService } from "../../../shared/services/notifier.service";

@Component({
  selector: 'app-update-names',
  templateUrl: './update-names.component.html',
  styleUrls: ['./update-names.component.scss'],
})
export class UpdateNamesComponent {

  private _namesForm!: FormGroup;

  constructor(
    private profileService: ProfileService,
    private modals: ModalController,
    private notifier: NotifierService
  ) {
  }

  get namesForm(): FormGroup {
    return this._namesForm;
  }

  @Input() set names(names: UpdateNamesInput) {
    this._namesForm = new FormGroup({
      firstName: new FormControl(names.firstName, [Validators.required]),
      lastName: new FormControl(names.lastName, [Validators.required])
    });
  }

  async updateNames(): Promise<void> {
    if (!this._namesForm.valid) {
      await this.notifier.dispatchError('Не все данные заполены корректно!');
      return;
    }

    this.profileService
      .updateNames(this._namesForm.value)
      .subscribe(async () => await this.close());
  }

  hasError(controlName: string): boolean {
    const control = this._namesForm.get(controlName);

    if (!control || !control.dirty) {
      return false;
    }

    return control.hasError('required');
  }

  async close(): Promise<void> {
    await this.modals.dismiss();
  }
}
