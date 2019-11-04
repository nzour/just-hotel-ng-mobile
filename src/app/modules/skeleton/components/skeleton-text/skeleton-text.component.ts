import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-text',
  templateUrl: './skeleton-text.component.html',
  styleUrls: ['./skeleton-text.component.scss'],
})
export class SkeletonTextComponent {
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

export type BootstrapColumn = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
