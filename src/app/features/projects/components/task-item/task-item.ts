import { Component, input } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';

import { Task } from '../../models/task.model';

import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { DeadlinePipe } from '../../../../shared/pipes/deadline.pipe';

import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { OverdueDirective } from '../../../../shared/directives/overdue.directive';

@Component({
  imports: [DatePipe, NgClass, TruncatePipe, DeadlinePipe, HighlightDirective, OverdueDirective],
  selector: 'app-task-item',
  styleUrl: './task-item.css',
  templateUrl: './task-item.html',
})
export class TaskItem {
  task = input.required<Task>();
  showAssignee = input<boolean>(true);
}
