import { Component } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss'],
})
export class CreateRoomComponent {

  private _isCreating = false;

  constructor(
    private roomService: RoomService,
    private router: Router,
    private location: Location
  ) { }

  private _roomForm = new FormGroup({
    cost: new FormControl(0, [Validators.required]),
    roomType: new FormControl(null, [Validators.required])
  });

  get roomForm(): FormGroup {
    return this._roomForm;
  }

  back(): void {
    this.location.back();
  }

  async createRoom(): Promise<void> {
    if (this._isCreating) {
      return;
    }

    if (!this._roomForm.valid) {
      return;
    }

    this._isCreating = true;

    this.roomService
      .createRoom(this._roomForm.value)
      .pipe(finalize(() => this._isCreating = false))
      .subscribe(async () => await this.router.navigate(['rooms']));
  }
}
