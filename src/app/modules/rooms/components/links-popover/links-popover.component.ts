import { Component, Input } from '@angular/core';
import { IonicColor } from '../../../shared/types/manual';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-links-popover',
  templateUrl: './links-popover.component.html',
  styleUrls: ['./links-popover.component.scss'],
})
export class LinksPopoverComponent {

  private _links = Array<NavigateLink | HandleLink>();

  constructor(private router: Router, private popovers: PopoverController) { }

  get links(): Array<NavigateLink | HandleLink> {
    return this._links;
  }

  @Input() set links(links: Links) {
    this._links = links;
  }

  async onClicked(link: NavigateLink | HandleLink): Promise<void> {
    if (this.isNavigateLink(link)) {
      await this.router.navigate(link.navigateTo);
    } else {
      link.click();
    }

    const popover = await this.popovers.getTop();

    if (popover) {
      await this.popovers.dismiss();
    }
  }

  private isNavigateLink(link: any): link is NavigateLink {
    return 'navigateTo' in link;
  }
}

export type Links = Array<NavigateLink | HandleLink>;

export type NavigateLink = { navigateTo: string[] } & Link;

export type HandleLink = { click: () => void } & Link;

interface Link {
  text: string,
  color?: IonicColor | string
}
