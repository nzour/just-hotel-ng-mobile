import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp, tsToMoment } from '../types/manual';

@Pipe({
  name: 'tsToDate'
})
export class TsToDatePipe implements PipeTransform {

  private readonly DEFAULT_FORMAT = 'DD:MM:YYYY';

  transform(ts: Timestamp, format: string = this.DEFAULT_FORMAT): string {
    return tsToMoment(ts).format(format);
  }
}
