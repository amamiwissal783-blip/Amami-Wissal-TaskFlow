import {
  Component,
  computed,
  input,
  output,
  inject
} from '@angular/core';

import { FavoritesService } from '../../../../core/services/favorites.service';

import {
  RecentProjectsService
} from '../../../../core/services/recent-projects';

import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  KeyValuePipe,
  PercentPipe,
  UpperCasePipe
} from '@angular/common';

import { User } from '../../../users/models/user.model';

import { Project } from '../../models/project.model';

import { TaskStatusChange } from '../../models/task-status-change.model';

import { TaskDelete } from '../../models/task-delete.model';

import { TaskList } from '../task-list/task-list';

import { TaskCountPipe } from '../../../../shared/pipes/task-count.pipe';

import { HoverScaleDirective } from '../../../../shared/directives/hover-scale.directive';

import { ThemeService } from '../../../../core/services/theme';
@Component({
  selector: 'app-project-card',

  imports: [
    TaskList,

    HoverScaleDirective,

    TaskCountPipe,

    UpperCasePipe,

    DatePipe,

    CurrencyPipe,

    PercentPipe,

    DecimalPipe,

    KeyValuePipe
  ],

  templateUrl:
    './project-card.html',

  styleUrl:
    './project-card.css'
})
export class ProjectCard {

  themeService = inject(ThemeService);

  favoritesService =
    inject(FavoritesService);


  recentProjectsService =
    inject(RecentProjectsService);


  project =
    input.required<Project>();


  users =
    input<User[]>([]);


  completedTasks =
    input<number>(0);


  projectSelected =
    output<Project>();


  taskStatusChange =
    output<TaskStatusChange>();


  taskDelete =
    output<TaskDelete>();

  projectDelete = output<number>();

  completionRate =
    computed(() => {

      const total =
        this.project()
          .tasks
          .length;


      if (total === 0) {
        return 0;
      }


      return (
        this.completedTasks()
        /
        total
      );

    });



  averageCost =
    computed(() => {

      const total =
        this.project()
          .tasks
          .length;


      if (total === 0) {
        return 0;
      }


      return (
        this.project().budget
        /
        total
      );

    });



  tasksByPriority =
    computed(() => {

      const result = {

        Haute: 0,

        Moyenne: 0,

        Basse: 0

      };


      for (
        const task
        of this.project().tasks
      ) {

        result[
          task.priority
        ]++;

      }


      return result;

    });


  // Couleur barre

  get barColor(): string {

    const rate =
      this.completionRate();


    if (rate < 0.34) {

      return '#ef4444';

    }


    if (rate <= 0.66) {

      return '#f59e0b';

    }


    return '#22c55e';
  }


  selectProject(): void {

    this.recentProjectsService.addProject(
      this.project()
    );

    this.projectSelected.emit(
      this.project()
    );

  }


  onTaskStatusChange(
    event: TaskStatusChange
  ): void {

    this.taskStatusChange.emit({

      projectId:
        this.project().id,

      taskId:
        event.taskId,

      status:
        event.status

    });

  }

  onTaskDelete(
    event: TaskDelete
  ): void {

    this.taskDelete.emit({

      projectId:
        this.project().id,

      taskId:
        event.taskId

    });

  }

  deleteProject(): void {

  this.projectDelete.emit(
    this.project().id
  );
}

}
