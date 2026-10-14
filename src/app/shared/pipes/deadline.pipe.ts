import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from '../../features/projects/models/task.model';

@Pipe({
  name: 'deadline'
})
export class DeadlinePipe implements PipeTransform {

  transform(
    value: string | null | undefined,
    status?: TaskStatus
  ): string {

    if (!value) {
      return 'Pas d’échéance';
    }

    if (status === 'Terminé') {
      return 'Terminée';
    }

    const today = new Date();
    const deadline = new Date(value);

    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);

    const difference =
      deadline.getTime() - today.getTime();

    const days = Math.round(
      difference / (1000 * 60 * 60 * 24)
    );

    if (days === 0) {
      return 'Aujourd’hui';
    }

    if (days === 1) {
      return 'Demain';
    }

    if (days > 1) {
      return `Dans ${days} jours`;
    }

    const lateDays = Math.abs(days);

    if (lateDays === 1) {
      return 'En retard de 1 jour';
    }

    return `En retard de ${lateDays} jours`;
  }
}
