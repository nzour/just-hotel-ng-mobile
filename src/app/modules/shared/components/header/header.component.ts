import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private _title: string = 'Гостиница Зобор';

  get title(): string {
    return this._title;
  }

  @Input() set title(value: string) {
    this._title = value;
  }
}
