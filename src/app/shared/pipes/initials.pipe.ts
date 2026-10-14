import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(value: string | null | undefined): string {

    if (!value || value.trim() === '') {
      return '?';
    }

    const words = value
      .trim()
      .split(/\s+/);

    const firstTwoWords = words.slice(0, 2);

    return firstTwoWords
      .map(word => word.charAt(0).toUpperCase())
      .join('');
  }
}
