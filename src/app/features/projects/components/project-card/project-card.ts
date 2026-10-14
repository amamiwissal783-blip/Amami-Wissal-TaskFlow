import { Component, computed, input, output } from '@angular/core';
import {
  CurrencyPipe,
  DatePipe,
  NgClass,
  DecimalPipe,
  KeyValuePipe,
  PercentPipe,
  SlicePipe,
  UpperCasePipe
} from '@angular/common';

import { Project } from '../../models/project.model';
import { TaskList } from '../task-list/task-list';

@Component({
  selector: 'app-project-card',

  imports: [
    TaskList,
    UpperCasePipe,
    DatePipe,
    CurrencyPipe,
    PercentPipe,
    DecimalPipe,
    SlicePipe,
    KeyValuePipe
  ],

  templateUrl: './project-card.html',
  styleUrl: './project-card.css'
})
export class ProjectCard {

  project = input.required<Project>();

  projectSelected = output<Project>();

  completionRate = computed(() => {

    const tasks = this.project().tasks;

    if (tasks.length === 0) {
      return 0;
    }

    const completedTasks = tasks.filter(
      task => task.status === 'Terminé'
    ).length;

    return completedTasks / tasks.length;
  });


  averageCost = computed(() => {

    const tasks = this.project().tasks;

    if (tasks.length === 0) {
      return 0;
    }

    return this.project().budget / tasks.length;
  });


  tasksByPriority = computed(() => {

    const result = {
      Haute: 0,
      Moyenne: 0,
      Basse: 0
    };

    for (const task of this.project().tasks) {

      result[task.priority]++;
    }

    return result;
  });

  get barColor(): string {

    const rate = this.completionRate();

    if (rate < 0.34) {
      return '#ef4444';
    }

    if (rate <= 0.66) {
      return '#f59e0b';
    }

    return '#22c55e';
  }


  selectProject(): void {
    this.projectSelected.emit(this.project());
  }
}
