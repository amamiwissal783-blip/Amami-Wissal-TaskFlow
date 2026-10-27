import { TaskStatus } from './task.model';

export interface TaskStatusChange {
  taskId: number;
  status: TaskStatus;
  projectId?: number;
}
