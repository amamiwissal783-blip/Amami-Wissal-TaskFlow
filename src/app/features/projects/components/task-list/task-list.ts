import { Component, input } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';

import { Task } from '../../models/task.model';

import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { DeadlinePipe } from '../../../../shared/pipes/deadline.pipe';

import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { OverdueDirective } from '../../../../shared/directives/overdue.directive';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';

@Component({
  selector: 'app-task-list',

  imports: [
    DatePipe,
    NgClass,
    TruncatePipe,
    DeadlinePipe,
    HighlightDirective,
    OverdueDirective,
    TooltipDirective
  ],

  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {

  tasks = input.required<Task[]>();

  showAssignee = input<boolean>(true);
}
