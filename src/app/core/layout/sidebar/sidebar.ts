import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TaskItem, TaskPriority, TaskStatus } from '../../services/task';

type StatusFilter = 'All' | TaskStatus;
type PriorityFilter = 'All' | TaskPriority;
type SortBy = 'priority' | 'dueDate' | 'title';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside
      class="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-8 shadow-2xl shadow-slate-950/40 backdrop-blur lg:sticky lg:top-6 lg:max-h-[calc(100vh-7.5rem)] lg:overflow-y-auto"
    >
      <p class="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Workspace</p>
      <nav class="space-y-1 text-sm">
        <a
          routerLink="/dashboard"
          routerLinkActive="bg-white/10 text-white"
          [routerLinkActiveOptions]="{ exact: true }"
          class="block rounded-lg px-3 py-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          Overview
        </a>
        <a
          routerLink="/new-task"
          routerLinkActive="bg-white/10 text-white"
          class="block rounded-lg px-3 py-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          Create Task
        </a>
      </nav>

      <div class="mt-5 border-t border-white/10 pt-4">
        <p class="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Quick Filters</p>
        <div class="space-y-2">
          <p class="text-[11px] uppercase tracking-wide text-slate-500">Status</p>
          <div class="flex flex-wrap gap-1.5">
            @for (item of statusOptions; track item) {
              <button
                (click)="statusChange.emit(item)"
                class="rounded-md border px-2.5 py-1 text-xs font-semibold transition"
                [class]="
                  selectedStatus === item
                    ? 'border-sky-400/40 bg-sky-500/20 text-sky-200'
                    : 'border-white/10 text-slate-300 hover:border-white/20'
                "
              >
                {{ item }}
              </button>
            }
          </div>
        </div>

        <div class="mt-3 space-y-2">
          <p class="text-[11px] uppercase tracking-wide text-slate-500">Priority</p>
          <div class="flex flex-wrap gap-1.5">
            @for (item of priorityOptions; track item) {
              <button
                (click)="priorityChange.emit(item)"
                class="rounded-md border px-2.5 py-1 text-xs font-semibold transition"
                [class]="
                  selectedPriority === item
                    ? 'border-cyan-400/40 bg-cyan-500/20 text-cyan-200'
                    : 'border-white/10 text-slate-300 hover:border-white/20'
                "
              >
                {{ item }}
              </button>
            }
          </div>
        </div>

        <div class="mt-3">
          <label for="sortBy" class="mb-1 block text-[11px] uppercase tracking-wide text-slate-500">Sort</label>
          <select
            id="sortBy"
            class="w-full rounded-lg border border-white/10 bg-slate-950/80 px-2.5 py-1.5 text-xs text-slate-200 outline-none ring-sky-500/40 focus:ring-2"
            [value]="selectedSort"
            (change)="sortChange.emit($any($event.target).value)"
          >
            <option value="priority">Priority</option>
            <option value="dueDate">Due date</option>
            <option value="title">Title</option>
          </select>
        </div>

        <button
          (click)="clearAll.emit()"
          class="mt-3 w-full rounded-lg border border-white/10 bg-slate-900 px-2.5 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-white/20"
        >
          Reset filters
        </button>
      </div>

      <div class="mt-5 border-t border-white/10 pt-4">
        <p class="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Upcoming</p>
        <div class="space-y-2">
          @for (task of upcomingTasks.slice(0, 3); track task.id) {
            <div class="rounded-lg border border-white/10 bg-slate-950/60 p-2">
              <p class="truncate text-xs font-semibold text-slate-100">{{ task.title }}</p>
              <p class="mt-0.5 text-[11px] text-slate-400">{{ task.dueDate }}</p>
            </div>
          }
        </div>
      </div>
    </aside>
  `,
  styles: [],
})
export class Sidebar {
  @Input() selectedStatus: StatusFilter = 'All';
  @Input() selectedPriority: PriorityFilter = 'All';
  @Input() selectedSort: SortBy = 'priority';
  @Input() upcomingTasks: TaskItem[] = [];

  @Output() statusChange = new EventEmitter<StatusFilter>();
  @Output() priorityChange = new EventEmitter<PriorityFilter>();
  @Output() sortChange = new EventEmitter<SortBy>();
  @Output() clearAll = new EventEmitter<void>();

  protected readonly statusOptions: StatusFilter[] = ['All', 'Pending', 'Completed'];
  protected readonly priorityOptions: PriorityFilter[] = ['All', 'High', 'Medium', 'Low'];
}
