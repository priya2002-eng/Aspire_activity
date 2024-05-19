import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender',
  standalone: true
})
export class GenderPipe implements PipeTransform {

  transform(value: string): string {
    if (value.toLowerCase() === 'male') {
      return 'Mr';
    } else if (value.toLowerCase() === 'female') {
      return 'Ms';
    } else {
      return '';
    }
  }

}
