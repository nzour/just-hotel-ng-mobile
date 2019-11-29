import { Component } from '@angular/core';
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

  constructor(
    private roomService: RoomService,
    private modals: ModalController,
    private notifier: NotifierService
  ) { }

  private _room?: RoomOutput;

  get room(): RoomOutput | undefined {
    return this._room;
  }

  async refresh(refresher: IonRefresher): Promise<void> {
    await refresher.complete;
    await this.fetchRoom();
  }

  private async fetchRoom(): Promise<void> {
    if (!this._room) {
      await this.notifier.dispatchError('Возникла критическая ошибка!');
      await this.modals.dismiss();
      return;
    }

    this.roomService
      .getRoom(this._room.id)
      .subscribe(output => this._room = output);
  }
}
