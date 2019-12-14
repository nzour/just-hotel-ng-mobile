import { Component } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from '../../../shared/services/notifier.service';
import { finalize, tap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.scss'],
})
export class CreateServiceComponent {

  private _processing = false;

  private _serviceForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    cost: new FormControl(0, [Validators.required, Validators.min(0)])
  });

  constructor(
    private servicesService: ServicesService,
    private notifier: NotifierService,
    private location: Location
  ) { }

  get serviceForm(): FormGroup {
    return this._serviceForm;
  }

  createService(): void {
    if (this._processing || !this._serviceForm.valid) {
      return;
    }

    this.servicesService
      .createService(this._serviceForm.value)
      .pipe(
        tap(() => this._processing = true),
        finalize(() => this._processing = false)
      )
      .subscribe(async () => {
        await this.notifier.dispatchSuccess('Успешно!');
        this._serviceForm.reset();
      });
  }

  back(): void {
    this.location.back();
  }
}
