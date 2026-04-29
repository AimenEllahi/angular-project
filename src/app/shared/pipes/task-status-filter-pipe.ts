import { Pipe, PipeTransform } from '@angular/core';
import { TaskItem, TaskStatus } from '../../core/services/task';

@Pipe({
  name: 'taskStatusFilter',
  standalone: true,
})
export class TaskStatusFilterPipe implements PipeTransform {
  transform(tasks: TaskItem[], selected: TaskStatus | 'All'): TaskItem[] {
    if (!tasks?.length || selected === 'All') return tasks ?? [];
    return tasks.filter((task) => task.status === selected);
  }
}
