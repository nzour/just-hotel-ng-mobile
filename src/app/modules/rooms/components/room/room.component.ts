import { Component, Input } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { RoomOutput } from '../../../shared/types/room';
import { NotifierService } from '../../../shared/services/notifier.service';
import { IonRefresher, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent {

  private _room?: RoomOutput;

  constructor(
    private roomService: RoomService,
    private modals: ModalController,
    private notifier: NotifierService
  ) { }

  get room(): RoomOutput | undefined {
    return this._room;
  }

  @Input() set room(value: RoomOutput | undefined) {
    this._room = value;
  }

  async refresh(refresher: IonRefresher): Promise<void> {
    await refresher.complete;
    await this.fetchRoom();
  }

  async close(): Promise<void> {
    await this.modals.dismiss();
  }

  private async fetchRoom(): Promise<void> {
    if (!this._room) {
      await this.notifier.dispatchError('Возникла критическая ошибка!');
      await this.close();
      return;
    }

    this.roomService
      .getRoom(this._room.id)
      .subscribe(output => this._room = output);
  }
}
