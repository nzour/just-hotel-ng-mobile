import { Component, OnInit } from '@angular/core';
import { ProfileOutput, ProfileService } from '../services/profile.service';
import { IonRefresher } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  private _profile?: ProfileOutput;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.fetchProfileData();
  }

  get profile(): ProfileOutput | undefined {
    return this._profile;
  }

  logout(): void {
    // todo: implement
  }

  fetchProfileData(): void {
    this.profileService.getProfile()
      .subscribe(output => this._profile = output);
  }

  async refreshProfileData(refresher: IonRefresher): Promise<void> {
    this.fetchProfileData();
    await refresher.complete();
  }
}
