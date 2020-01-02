import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicColor } from '../../types/manual';

@Component({
  selector: 'app-footer-buttons',
  templateUrl: './footer-buttons.component.html',
  styleUrls: ['./footer-buttons.component.scss'],
})
export class FooterButtonsComponent {

  private _confirmButtonEmitter = new EventEmitter<void>();
  private _cancelButtonEmitter = new EventEmitter<void>();

  private _confirmButtonName = 'Подтвердить';

  get confirmButtonName(): string {
    return this._confirmButtonName;
  }

  @Input() set confirmButtonName(value: string) {
    this._confirmButtonName = value;
  }

  private _cancelButtonName = 'Отмена';

  get cancelButtonName(): string {
    return this._cancelButtonName;
  }

  @Input() set cancelButtonName(value: string) {
    this._cancelButtonName = value;
  }

  private _confirmButtonColor: IonicColor = 'primary';

  get confirmButtonColor(): IonicColor {
    return this._confirmButtonColor;
  }

  private _cancelButtonColor: IonicColor = 'light';

  get cancelButtonColor(): IonicColor {
    return this._cancelButtonColor;
  }

  @Output() get confirmButtonClick(): EventEmitter<void> {
    return this._confirmButtonEmitter;
  }

  @Output() get cancelButtonClick(): EventEmitter<void> {
    return this._cancelButtonEmitter;
  }

  emitConfirmButton(): void {
    this._confirmButtonEmitter.emit();
  }

  emitCancelButton(): void {
    this._cancelButtonEmitter.emit();
  }
}
