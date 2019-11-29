import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../shared/services/token.service';
import { Guid } from '../../../shared/types/manual';

@Component({
  selector: 'app-room-action-buttons',
  templateUrl: './room-action-buttons.component.html',
  styleUrls: ['../room-shared-styles.scss'],
})
export class RoomActionButtonsComponent {

  constructor(private router: Router, private tokenService: TokenService) { }

  private _roomId?: Guid;

  @Input() set roomId(value: Guid) {
    this._roomId = value;
  }

  get isNotAuthorized(): boolean {
    return !this.tokenService.hasTokeInfo;
  }

  get isManager(): boolean {
    if (this.isNotAuthorized) {
      return false;
    }

    return 'Manager' === this.tokenService.tokenInfo.role;
  }

  get isClient(): boolean {
    if (this.isNotAuthorized) {
      return false;
    }

    return 'Client' === this.tokenService.tokenInfo.role;
  }

  async goToRoomModalPage(): Promise<void> {
    await this.router.navigate([ /* todo: Navigate to the RentRoomComponent */]);
  }

  async goToManageRoom(): Promise<void> {
    await this.router.navigate([ /* todo: Navigate to the ManageRoomComponent */]);
  }
}
