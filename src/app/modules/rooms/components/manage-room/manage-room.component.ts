import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { RoomOutput } from '../../../shared/types/room';
import { Observable } from 'rxjs';
import { RoomResolvedData } from '../../resolvers/room.resolver';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from '../../../shared/services/notifier.service';
import { IonRefresher } from '@ionic/angular';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-manage-room',
  templateUrl: './manage-room.component.html',
  styleUrls: ['./manage-room.component.scss'],
})
export class ManageRoomComponent implements OnInit {

  private _room?: RoomOutput;
  private _processing = false;
  private _roomForm?: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private roomService: RoomService,
    private notifier: NotifierService
  ) { }

  ngOnInit() {
    (this.route.data as Observable<RoomResolvedData>)
      .subscribe(data => {
        this.initForm(data.room);
        this._room = data.room;
      });
  }

  get roomForm(): FormGroup | undefined {
    return this._roomForm;
  }

  back(): void {
    this.location.back();
  }

  updateRoom(): void {
    if (this._processing || !this._roomForm || !this._roomForm.valid) {
      return;
    }

    this.roomService
      .updateRoom(this._roomForm.value)
      .pipe(
        tap(() => this._processing = true),
        finalize(() => this._processing = false)
      )
      .subscribe(async () => {
        await this.notifier.dispatchSuccess('Успешно!');
        await this.fetchRoom();
      });
  }

  async refresh(refresher: IonRefresher): Promise<void> {
    await refresher.complete();
    await this.fetchRoom();
  }

  private async fetchRoom(): Promise<void> {
    if (!this._room) {
      await this.notifier.dispatchWarning('Произошла непредвиденная ошибка.');
      await this.router.navigate(['rooms']);
      return;
    }

    this.roomService
      .getRoom(this._room.id)
      .subscribe(output => this._room = output);
  }

  private initForm(room: RoomOutput): void {
    this._roomForm = new FormGroup({
      id: new FormControl(room.id),
      roomType: new FormControl(room.roomType, [Validators.required]),
      cost: new FormControl(room.cost, [Validators.required, Validators.min(0)])
    });
  }
}
