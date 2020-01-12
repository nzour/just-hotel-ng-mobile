import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { RoomOutput } from '../../../shared/types/room';
import { NotifierService } from '../../../shared/services/notifier.service';
import { IonRefresher } from '@ionic/angular';
import { firstOrDefault } from '../../../shared/utils/functional';
import { noImage } from '../../../shared/utils/constants/noImage';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RoomResolvedData } from '../../resolvers/room.resolver';
import { Location } from '@angular/common';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['../room-shared-styles.scss']
})
export class RoomComponent implements OnInit {

  private _room?: RoomOutput;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private location: Location,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {
    (this.route.data as Observable<RoomResolvedData>)
      .subscribe(data => this._room = data.room);
  }

  get room(): RoomOutput | undefined {
    return this._room;
  }

  get firstOrDefaultImage(): string {
    if (!this._room) {
      throw new Error(`Room hasn't been initialized!`);
    }

    return firstOrDefault(this._room.images) || noImage;
  }

  async refresh(refresher: IonRefresher): Promise<void> {
    await refresher.complete();
    await this.fetchRoom();
  }

  back(): void {
    this.location.back();
  }

  private async fetchRoom(): Promise<void> {
    if (!this._room) {
      await this.notifier.dispatchError('Возникла критическая ошибка!');
      await this.back();
      return;
    }

    this.roomService
      .getRoom(this._room.id)
      .subscribe(output => this._room = output);
  }
}
