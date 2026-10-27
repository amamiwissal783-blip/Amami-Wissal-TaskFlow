import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

import { TaskStatus } from '../../../features/projects/models/task.model';

@Component({
  selector: 'app-task-status-badge',
  imports: [
    NgClass
  ],
  templateUrl: './task-status-badge.html',
  styleUrl: './task-status-badge.css'
})
export class TaskStatusBadge {

  status = input.required<TaskStatus>();

}
