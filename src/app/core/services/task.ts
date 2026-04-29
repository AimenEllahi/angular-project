import { Injectable, computed, signal } from '@angular/core';

export type TaskPriority = 'High' | 'Medium' | 'Low';
export type TaskStatus = 'Completed' | 'Pending';

export interface TaskItem {
  id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
}

export interface ActivityItem {
  id: number;
  text: string;
  time: string;
  tone: 'info' | 'success' | 'warning';
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly _tasks = signal<TaskItem[]>([
    {
      id: 1,
      title: 'Finalize project architecture',
      description: 'Define shared modules, page routing, and service boundaries for the MVP.',
      priority: 'High',
      status: 'Pending',
      dueDate: 'May 02, 2026',
    },
    {
      id: 2,
      title: 'Build task details view',
      description: 'Display task metadata, due date, status timeline, and owner information.',
      priority: 'Medium',
      status: 'Pending',
      dueDate: 'May 05, 2026',
    },
    {
      id: 3,
      title: 'Set up responsive dashboard widgets',
      description: 'Add stat cards for completion rate, overdue tasks, and active users.',
      priority: 'Low',
      status: 'Completed',
      dueDate: 'Apr 27, 2026',
    },
    {
      id: 4,
      title: 'Implement loading and empty states',
      description: 'Add polished skeletons and empty screens for all route states.',
      priority: 'Medium',
      status: 'Pending',
      dueDate: 'May 08, 2026',
    },
    {
      id: 5,
      title: 'Write deployment checklist',
      description: 'Prepare production checklist, environment setup, and rollback steps.',
      priority: 'Low',
      status: 'Completed',
      dueDate: 'Apr 25, 2026',
    },
  ]);

  readonly tasks = computed(() => this._tasks());
  readonly openCount = computed(() => this._tasks().filter((task) => task.status === 'Pending').length);
  readonly completedCount = computed(
    () => this._tasks().filter((task) => task.status === 'Completed').length,
  );
  readonly overdueCount = computed(() => 2);

  readonly recentActivity = signal<ActivityItem[]>([
    { id: 1, text: 'Updated API error handling in TaskService.', time: '5m ago', tone: 'info' },
    { id: 2, text: 'Marked "Dashboard widgets" as completed.', time: '1h ago', tone: 'success' },
    { id: 3, text: 'High-priority task approaching due date.', time: '3h ago', tone: 'warning' },
  ]);
}
