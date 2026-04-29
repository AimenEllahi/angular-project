import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskPriorityBg } from '../directives/task-priority-bg';

type TaskPriority = 'High' | 'Medium' | 'Low';
type TaskStatus = 'Completed' | 'Pending';

@Component({
  selector: 'app-task-card',
  imports: [RouterLink, TaskPriorityBg],
  template: `
    <article
      [appTaskPriorityBg]="priority"
      class="group flex h-60 flex-col rounded-2xl border border-white/10 bg-slate-900/75 p-4 shadow-xl shadow-slate-950/40 ring-1 ring-white/5 transition hover:-translate-y-0.5 hover:border-sky-400/40 hover:ring-sky-400/20"
    >
      <div class="mb-3 flex items-start justify-between gap-3">
        <h3 class="line-clamp-2 text-base font-semibold leading-6 text-white">{{ title }}</h3>
        <span class="rounded-full border px-2 py-1 text-xs font-semibold" [class]="priorityBadgeClass">
          {{ priority }}
        </span>
      </div>

      <p class="line-clamp-3 text-sm leading-6 text-slate-400">{{ description }}</p>
      <p class="mb-4 text-xs text-slate-500">Due: {{ dueDate || 'TBD' }}</p>

      <div class="mt-auto flex items-center justify-between">
        <span class="rounded-full border px-2 py-1 text-xs font-semibold" [class]="statusBadgeClass">
          {{ status }}
        </span>
        <a
          [routerLink]="['/tasks', taskId]"
          class="text-sm font-semibold text-sky-400 transition group-hover:text-sky-300"
        >
          View details
        </a>
      </div>
    </article>
  `,
  styles: [],
})
export class TaskCard {
  @Input() taskId = 1;
  @Input() title = 'Untitled Task';

  @Input() description = 'No description available.';
  @Input() priority: TaskPriority = 'Medium';
  @Input() status: TaskStatus = 'Pending';
  @Input() dueDate = '';

  get priorityBadgeClass(): string {
    if (this.priority === 'High') return 'border-rose-400/30 bg-rose-500/20 text-rose-200';
    if (this.priority === 'Low') return 'border-emerald-400/30 bg-emerald-500/20 text-emerald-200';
    return 'border-amber-400/30 bg-amber-500/20 text-amber-200';
  }

  get statusBadgeClass(): string {
    return this.status === 'Completed'
      ? 'border-emerald-400/30 bg-emerald-500/20 text-emerald-200'
      : 'border-slate-500/30 bg-slate-700/70 text-slate-200';
  }
}
