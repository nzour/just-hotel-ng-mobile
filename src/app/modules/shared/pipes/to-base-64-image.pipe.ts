import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toBase64Image'
})
export class ToBase64ImagePipe implements PipeTransform {
  transform(image: any): string {
    return `data:image/png;base64, ${image}`;
  }
}
