import { Task, TaskStatus } from './task.model';

export interface Project {
  id: number;
  name: string;
  description: string;
  status: TaskStatus;
  tasks: Task[];
}
