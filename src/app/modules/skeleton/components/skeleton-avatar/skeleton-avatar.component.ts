import { Component, Input } from '@angular/core';
import { BootstrapColumn } from '../skeleton-text/skeleton-text.component';

@Component({
  selector: 'app-skeleton-avatar',
  templateUrl: './skeleton-avatar.component.html',
  styleUrls: ['./skeleton-avatar.component.scss'],
})
export class SkeletonAvatarComponent {
  private _count = 1;
  private _columnSize?: BootstrapColumn;

  get count(): number {
    return this._count;
  }

  get columnSize(): BootstrapColumn | undefined {
    return this._columnSize;
  }

  @Input() set count(value: number) {
    this._count = value;
  }

  @Input() set columnSize(value: BootstrapColumn | undefined) {
    this._columnSize = value;
  }
}
