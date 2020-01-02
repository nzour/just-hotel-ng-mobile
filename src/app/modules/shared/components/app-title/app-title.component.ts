import { Component, Input } from '@angular/core';
import { IonicColor } from "../../types/manual";

@Component({
  selector: 'app-title',
  templateUrl: './app-title.component.html',
})
export class AppTitleComponent {

  private _title = 'Гостиница <b>Зобор</b>';
  private _color: IonicColor = 'dark';

  get title(): string {
    return this._title;
  }

  get color(): IonicColor {
    return this._color;
  }

  @Input() set title(value: string) {
    this._title = value;
  }

  @Input() set color(value: IonicColor) {
    this._color = value;
  }
}
