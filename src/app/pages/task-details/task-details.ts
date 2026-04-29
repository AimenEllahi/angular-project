import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-details',
  imports: [RouterLink],
  template: `
    <section class="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <a routerLink="/dashboard" class="text-sm font-semibold text-sky-400 hover:text-sky-300">
        ← Back to dashboard
      </a>

      <article class="mt-4 rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40 ring-1 ring-white/5">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Task Details</p>
        <h2 class="mt-2 text-3xl font-bold text-white">Task #{{ taskId() }}</h2>
        <p class="mt-3 text-sm leading-7 text-slate-300">
          This view can display fetched task information, status history, comments, and assignment details.
        </p>

        <div class="mt-6 grid gap-4 sm:grid-cols-3">
          <div class="rounded-xl border border-white/10 bg-slate-950/40 p-4">
            <p class="text-xs uppercase tracking-wide text-slate-400">Status</p>
            <p class="mt-1 text-sm font-medium text-emerald-300">Pending</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-slate-950/40 p-4">
            <p class="text-xs uppercase tracking-wide text-slate-400">Priority</p>
            <p class="mt-1 text-sm font-medium text-amber-300">Medium</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-slate-950/40 p-4">
            <p class="text-xs uppercase tracking-wide text-slate-400">Due date</p>
            <p class="mt-1 text-sm font-medium text-slate-200">May 08, 2026</p>
          </div>
        </div>
      </article>
    </section>
  `,
  styles: [],
})
export class TaskDetails {
  private readonly route = inject(ActivatedRoute);
  protected readonly taskId = computed(() => this.route.snapshot.paramMap.get('id') ?? 'unknown');
}
