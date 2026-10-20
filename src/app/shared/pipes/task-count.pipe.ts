import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskCount'
})
export class TaskCountPipe implements PipeTransform {

  transform(count: number): string {

    if (count === 0) {
      return 'Aucune tâche';
    }

    if (count === 1) {
      return '1 tâche';
    }

    return `${count} tâches`;
  }
}
