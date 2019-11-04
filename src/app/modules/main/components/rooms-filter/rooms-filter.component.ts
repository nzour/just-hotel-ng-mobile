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

  constructor(private modals: ModalController) { }

  private _filter: RoomInputFilter = {};

  @Input() set filter(filter: RoomInputFilter) {
    this._filter = filter;
  }

  private _form = new FormGroup({
    isRented: new FormControl(),
    roomType: new FormControl()
  });

  get form(): FormGroup {
    return this._form;
  }

  async close(): Promise<void> {
    await this.modals.dismiss(this._filter);
  }
}
