import { Component, computed, inject, signal } from '@angular/core';
import { Sidebar } from '../../core/layout/sidebar/sidebar';
import { TaskCard } from '../../shared/task-card/task-card';
import { TaskPriority, TaskService, TaskStatus } from '../../core/services/task';

@Component({
  selector: 'app-dashboard',
  imports: [Sidebar, TaskCard],
  template: `
    <section
      class="mx-auto h-full min-h-0 w-full max-w-7xl overflow-y-auto px-4 py-8 sm:px-6 lg:grid lg:grid-cols-[260px_1fr] lg:gap-6 lg:overflow-hidden lg:px-8"
    >
      <app-sidebar
        [selectedStatus]="selectedFilter()"
        [selectedPriority]="selectedPriority()"
        [selectedSort]="selectedSort()"
        [upcomingTasks]="upcomingTasks()"
        (statusChange)="selectedFilter.set($event)"
        (priorityChange)="selectedPriority.set($event)"
        (sortChange)="selectedSort.set($event)"
        (clearAll)="resetFilters()"
      />

      <div class="mt-6 min-h-0 lg:mt-0 lg:overflow-y-auto lg:pr-1">
        <div
          class="animate-fade-up mb-6 rounded-2xl border border-white/10 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-sky-950/60 p-6 shadow-2xl shadow-slate-950/50 ring-1 ring-white/5"
        >
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Dashboard</p>
          <h2 class="mt-2 text-3xl font-bold text-white">Welcome back</h2>
          <p class="mt-2 text-sm text-slate-300">
            Track progress, monitor priorities, and keep your sprint healthy.
          </p>
          <div class="mt-5 grid gap-3 sm:grid-cols-3">
            <div class="rounded-xl border border-white/10 bg-slate-950/50 p-3">
              <p class="text-xs uppercase tracking-wide text-slate-400">Open</p>
              <p class="mt-1 text-xl font-semibold text-white">{{ openCount() }}</p>
            </div>
            <div class="rounded-xl border border-white/10 bg-slate-950/50 p-3">
              <p class="text-xs uppercase tracking-wide text-slate-400">Completed</p>
              <p class="mt-1 text-xl font-semibold text-emerald-300">{{ completedCount() }}</p>
            </div>
            <div class="rounded-xl border border-white/10 bg-slate-950/50 p-3">
              <p class="text-xs uppercase tracking-wide text-slate-400">Overdue</p>
              <p class="mt-1 text-xl font-semibold text-rose-300">{{ overdueCount() }}</p>
            </div>
          </div>
        </div>

        <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 class="text-lg font-semibold text-white">Current tasks</h3>
          <div class="flex flex-wrap items-center gap-2">
            <input
              class="w-44 rounded-lg border border-white/10 bg-slate-900/70 px-3 py-1.5 text-xs text-slate-200 outline-none ring-sky-500/40 focus:ring-2"
              placeholder="Search tasks..."
              [value]="searchTerm()"
              (input)="searchTerm.set($any($event.target).value)"
            />
            @for (option of filters; track option) {
              <button
                (click)="selectedFilter.set(option)"
                class="rounded-lg border px-3 py-1.5 text-xs font-semibold transition"
                [class]="
                  selectedFilter() === option
                    ? 'border-sky-400/50 bg-sky-500/20 text-sky-200'
                    : 'border-white/10 bg-slate-900/70 text-slate-300 hover:border-white/20'
                "
              >
                {{ option }}
              </button>
            }
          </div>
        </div>

        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          @for (task of filteredAndSortedTasks(); track task.id) {
            <app-task-card
              [taskId]="task.id"
              [title]="task.title"
              [description]="task.description"
              [priority]="task.priority"
              [status]="task.status"
              [dueDate]="task.dueDate"
              class="animate-fade-up"
              [style.--delay]="task.id * 90 + 'ms'"
            />
          }
        </div>

        <div class="mt-8 grid gap-4 lg:grid-cols-2">
          <article class="animate-fade-up rounded-2xl border border-white/10 bg-slate-900/70 p-5 ring-1 ring-white/5">
            <h4 class="text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">Recent Activity</h4>
            <div class="mt-4 max-h-72 space-y-3 overflow-y-auto pr-1">
              @for (item of activity(); track item.id) {
                <div class="rounded-xl border border-white/10 bg-slate-950/50 p-3">
                  <p class="text-sm text-slate-100">{{ item.text }}</p>
                  <p
                    class="mt-1 text-xs"
                    [class]="
                      item.tone === 'success'
                        ? 'text-emerald-300'
                        : item.tone === 'warning'
                          ? 'text-amber-300'
                          : 'text-sky-300'
                    "
                  >
                    {{ item.time }}
                  </p>
                </div>
              }
            </div>
          </article>

          <article class="animate-fade-up rounded-2xl border border-white/10 bg-slate-900/70 p-5 ring-1 ring-white/5">
            <h4 class="text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">Sprint Progress</h4>
            <div class="mt-4 space-y-4">
              @for (lane of progressLanes(); track lane.name) {
                <div>
                  <div class="mb-1 flex items-center justify-between text-xs">
                    <span class="text-slate-300">{{ lane.name }}</span>
                    <span class="text-slate-400">{{ lane.value }}%</span>
                  </div>
                  <div class="h-2 rounded-full bg-slate-800">
                    <div class="h-2 rounded-full bg-gradient-to-r from-sky-400 to-cyan-300" [style.width.%]="lane.value"></div>
                  </div>
                </div>
              }
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class Dashboard {
  private readonly taskService = inject(TaskService);
  protected readonly filters: Array<'All' | TaskStatus> = ['All', 'Pending', 'Completed'];
  protected readonly selectedFilter = signal<'All' | TaskStatus>('All');
  protected readonly selectedPriority = signal<'All' | TaskPriority>('All');
  protected readonly selectedSort = signal<'priority' | 'dueDate' | 'title'>('priority');
  protected readonly searchTerm = signal('');
  protected readonly tasks = this.taskService.tasks;
  protected readonly activity = this.taskService.recentActivity;
  protected readonly openCount = this.taskService.openCount;
  protected readonly completedCount = this.taskService.completedCount;
  protected readonly overdueCount = this.taskService.overdueCount;

  protected readonly progressLanes = computed(() => [
    { name: 'Design', value: 84 },
    { name: 'Frontend', value: 72 },
    { name: 'QA', value: 58 },
  ]);

  protected readonly filteredAndSortedTasks = computed(() => {
    const status = this.selectedFilter();
    const priority = this.selectedPriority();
    const sort = this.selectedSort();
    const query = this.searchTerm().trim().toLowerCase();

    let list = this.tasks();
    if (status !== 'All') list = list.filter((task) => task.status === status);
    if (priority !== 'All') list = list.filter((task) => task.priority === priority);
    if (query) {
      list = list.filter(
        (task) =>
          task.title.toLowerCase().includes(query) || task.description.toLowerCase().includes(query),
      );
    }

    const priorityWeight: Record<TaskPriority, number> = { High: 0, Medium: 1, Low: 2 };
    const sorted = [...list];
    if (sort === 'priority') {
      sorted.sort((a, b) => priorityWeight[a.priority] - priorityWeight[b.priority]);
    } else if (sort === 'dueDate') {
      sorted.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    } else {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sorted;
  });

  protected readonly upcomingTasks = computed(() =>
    [...this.tasks()].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()),
  );

  protected resetFilters(): void {
    this.selectedFilter.set('All');
    this.selectedPriority.set('All');
    this.selectedSort.set('priority');
    this.searchTerm.set('');
  }
}
