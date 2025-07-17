import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userInitials'
})
export class UserInitialsPipe implements PipeTransform {

  transform(fullName: string): string {
    if (!fullName?.trim()) return '';

    return fullName
      .split(' ')
      .filter(word => word.length > 0)
      .slice(0, 2)
      .map(word => word[0].toUpperCase())
      .join('');
  }
}
