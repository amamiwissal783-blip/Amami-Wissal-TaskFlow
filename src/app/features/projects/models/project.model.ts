import { Task, TaskStatus } from './task.model';

export interface Project {
  id: number;
  name: string;
  description: string;
  status: TaskStatus;

  startDate: string;
  budget: number;

  tasks: Task[];
}
