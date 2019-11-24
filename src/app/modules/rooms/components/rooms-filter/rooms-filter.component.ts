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

  private _form!: FormGroup;

  constructor(private modals: ModalController) { }

  get form(): FormGroup {
    return this._form;
  }

  @Input() set filter(filter: RoomFilter) {
    this._form = new FormGroup({ roomTypes: new FormControl(filter.roomTypes) });
  }

  async close(): Promise<void> {
    await this.modals.dismiss();
  }

  async applyFilterAndClose(): Promise<void> {
    await this.modals.dismiss({ roomTypes: this._form.value.roomTypes });
  }

  resetFilter(): void {
    this._form.reset();
  }
}
