import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shirtSize',
  standalone: true
})
export class ShirtSizePipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 36:
        return 'M';
      case 38:
        return 'L';
      case 40:
        return 'XL';
      default:
        return 'Unknown size';
    }
  }

}
