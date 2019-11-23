import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RoomInputFilter } from '../../services/room.service';
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

  @Input() set filter(filter: RoomInputFilter) {
    this._form = new FormGroup({
      isRented: new FormControl(filter.isRented),
      roomTypes: new FormControl(filter.roomTypes)
    });
  }

  async close(): Promise<void> {
    await this.modals.dismiss({
      isRented: this._form.value.isRented,
      roomTypes: this._form.value.roomTypes
    });
  }
}
