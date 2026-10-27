import {
  Component,
  computed,
  input,
  output,
  signal
} from '@angular/core';

import {
  Task,
  TaskStatus
} from '../../models/task.model';

import { User } from '../../../users/models/user.model';

import { TaskStatusChange } from '../../models/task-status-change.model';

import { TaskDelete } from '../../models/task-delete.model';

import { TaskItem } from '../task-item/task-item';


type TaskFilter =
  | 'all'
  | 'in-progress'
  | 'completed';


@Component({
  selector: 'app-task-list',

  imports: [
    TaskItem
  ],

  templateUrl: './task-list.html',

  styleUrl: './task-list.css'
})
export class TaskList {


  // Données reçues

  tasks = input.required<Task[]>();

  users = input<User[]>([]);

  showAssignee = input<boolean>(true);

  showActions = input<boolean>(true);


  // Événements

  taskStatusChange =
    output<TaskStatusChange>();

  taskDelete =
    output<TaskDelete>();


  // Filtre

  filter =
    signal<TaskFilter>('all');


  // Tâches filtrées

  filteredTasks = computed(() => {

    const tasks = this.tasks();

    if (
      this.filter() === 'in-progress'
    ) {

      return tasks.filter(
        task =>
          task.status === 'En cours'
      );

    }


    if (
      this.filter() === 'completed'
    ) {

      return tasks.filter(
        task =>
          task.status === 'Terminé'
      );

    }


    return tasks;

  });


  setFilter(
    filter: TaskFilter
  ): void {

    this.filter.set(filter);

  }


  onTaskStatusChange(
    taskId: number,
    status: TaskStatus
  ): void {

    this.taskStatusChange.emit({

      taskId,
      status

    });

  }


  onTaskDelete(
    taskId: number
  ): void {

    this.taskDelete.emit({

      taskId

    });

  }


  getAssigneeName(
    assigneeId?: number
  ): string | null {

    if (!assigneeId) {
      return null;
    }


    const user =
      this.users().find(
        user =>
          user.id === assigneeId
      );


    return user?.name ?? null;
  }

}
