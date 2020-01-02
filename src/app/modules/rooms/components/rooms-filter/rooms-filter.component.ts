import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RoomFilter } from '../../services/room.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rooms-filter',
  templateUrl: './rooms-filter.component.html',
  styleUrls: ['./rooms-filter.component.scss'],
})
export class RoomsFilterComponent {

  private _form = new FormGroup({
    Single: new FormControl(false),
    Double: new FormControl(false),
    Triple: new FormControl(false),
  });

  constructor(private modals: ModalController) {
  }

  get form(): FormGroup {
    return this._form;
  }

  @Input() set filter(filter: RoomFilter) {
    if (!filter.roomTypes) {
      return;
    }

    for (let roomType of filter.roomTypes) {
      this._form.controls[roomType] = new FormControl(true);
    }
  }

  async close(): Promise<void> {
    await this.modals.dismiss();
  }

  async applyFilterAndClose(): Promise<void> {
    const roomTypes = Object.keys(this._form.controls)
      .filter(key => ['Single', 'Double', 'Triple'].includes(key) && Boolean(this._form.controls[key].value));

    await this.modals.dismiss({ roomTypes });
  }

  resetFilter(): void {
    this._form.reset();
  }
}
