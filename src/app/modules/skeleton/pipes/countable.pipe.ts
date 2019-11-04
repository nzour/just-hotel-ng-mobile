import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countable'
})
export class CountablePipe implements PipeTransform {
  transform(value: number): number[] {
    let array = Array<number>();

    for (let i = 0; i < value; i++) {
      array.push(i);
    }

    return array;
  }
}
