import { Component, input, output } from '@angular/core';
import {
  DatePipe,
  NgClass,
  NgStyle
} from '@angular/common';

import {
  Task,
  TaskStatus
} from '../../models/task.model';

import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { DeadlinePipe } from '../../../../shared/pipes/deadline.pipe';

import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { OverdueDirective } from '../../../../shared/directives/overdue.directive';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';
import { HoverScaleDirective } from '../../../../shared/directives/hover-scale.directive';

import { TaskStatusBadge } from '../../../../shared/components/task-status-badge/task-status-badge';

@Component({
  selector: 'app-task-item',

  imports: [
    DatePipe,
    NgClass,
    NgStyle,

    TruncatePipe,
    DeadlinePipe,

    HighlightDirective,
    OverdueDirective,
    TooltipDirective,
    HoverScaleDirective,

    TaskStatusBadge
  ],

  templateUrl: './task-item.html',
  styleUrl: './task-item.css'
})
export class TaskItem {

  task = input.required<Task>();

  showAssignee = input<boolean>(true);

  assigneeName = input<string | null>(null);

  showActions = input<boolean>(true);


  // Changement de statut
  taskStatusChange = output<TaskStatus>();

  // Suppression
  taskDelete = output<number>();


  changeStatus(): void {

    const currentStatus = this.task().status;

    let newStatus: TaskStatus;

    if (currentStatus === 'En attente') {

      newStatus = 'En cours';

    } else if (currentStatus === 'En cours') {

      newStatus = 'Terminé';

    } else {

      newStatus = 'En attente';

    }

    this.taskStatusChange.emit(newStatus);
  }


  deleteTask(): void {

    this.taskDelete.emit(
      this.task().id
    );

  }


  get deadlineColor(): string {

    const task = this.task();

    if (!task.dueDate) {
      return '#6b7280';
    }

    if (task.status === 'Terminé') {
      return '#16a34a';
    }

    const today = new Date();
    const dueDate = new Date(task.dueDate);

    today.setHours(0, 0, 0, 0);

    dueDate.setHours(0, 0, 0, 0);

    if (dueDate < today) {
      return '#dc2626';
    }

    return '#2563eb';
  }
}
