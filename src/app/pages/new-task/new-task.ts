import { Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-task',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="mx-auto h-full min-h-0 w-full max-w-7xl overflow-y-auto px-4 py-8 sm:px-6 lg:px-8">
      <div class="mb-6 flex items-center justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Tasks</p>
          <h2 class="text-3xl font-bold text-white">Create a new task</h2>
        </div>
        <a routerLink="/dashboard" class="text-sm font-semibold text-sky-400 hover:text-sky-300">
          Back to dashboard
        </a>
      </div>

      @if (showSuccess()) {
        <div class="mb-4 rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          Task saved successfully. This demo state is now reset.
        </div>
      }

      <div class="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <form
          [formGroup]="taskForm"
          (ngSubmit)="onSubmit()"
          class="space-y-5 rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40 ring-1 ring-white/5"
        >
          <div>
            <div class="mb-2 flex items-center justify-between">
              <label for="title" class="block text-sm font-semibold text-slate-200">Title</label>
              <span class="text-xs text-slate-400">{{ titleCount() }}/80</span>
            </div>
            <input
              id="title"
              type="text"
              maxlength="80"
              formControlName="title"
              class="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none ring-sky-500/40 transition focus:border-sky-400/60 focus:ring-2"
              placeholder="Implement user authentication flow"
            />
          </div>

          <div>
            <div class="mb-2 flex items-center justify-between">
              <label for="description" class="block text-sm font-semibold text-slate-200">Description</label>
              <span class="text-xs text-slate-400">{{ descriptionCount() }}/280</span>
            </div>
            <textarea
              id="description"
              rows="4"
              maxlength="280"
              formControlName="description"
              class="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none ring-sky-500/40 transition focus:border-sky-400/60 focus:ring-2"
              placeholder="Describe the scope, acceptance criteria, and dependencies."
            ></textarea>
            <div class="mt-2 h-1.5 rounded-full bg-slate-800">
              <div class="h-1.5 rounded-full bg-gradient-to-r from-sky-400 to-cyan-300" [style.width.%]="descriptionProgress()"></div>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label for="priority" class="mb-1 block text-sm font-semibold text-slate-200">Priority</label>
              <div class="relative">
                <select
                  id="priority"
                  formControlName="priority"
                  class="w-full appearance-none rounded-xl border border-slate-700 bg-slate-950/90 px-3 py-2 pr-10 text-sm font-medium text-slate-100 outline-none ring-sky-500/40 transition focus:border-sky-400/70 focus:ring-2"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <span class="pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-slate-400">
                  <svg viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4">
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.126l3.71-3.896a.75.75 0 1 1 1.08 1.04l-4.25 4.462a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label for="status" class="mb-1 block text-sm font-semibold text-slate-200">Status</label>
              <div class="relative">
                <select
                  id="status"
                  formControlName="status"
                  class="w-full appearance-none rounded-xl border border-slate-700 bg-slate-950/90 px-3 py-2 pr-10 text-sm font-medium text-slate-100 outline-none ring-sky-500/40 transition focus:border-sky-400/70 focus:ring-2"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
                <span class="pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-slate-400">
                  <svg viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4">
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.126l3.71-3.896a.75.75 0 1 1 1.08 1.04l-4.25 4.462a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label for="dueDate" class="mb-1 block text-sm font-semibold text-slate-200">Due date</label>
              <input
                id="dueDate"
                type="date"
                formControlName="dueDate"
                class="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none ring-sky-500/40 transition focus:border-sky-400/60 focus:ring-2"
              />
            </div>
            <div>
              <label for="assignee" class="mb-1 block text-sm font-semibold text-slate-200">Assignee</label>
              <input
                id="assignee"
                type="text"
                formControlName="assignee"
                class="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none ring-sky-500/40 transition focus:border-sky-400/60 focus:ring-2"
                placeholder="Alex Johnson"
              />
            </div>
          </div>

          <div class="rounded-xl border border-white/10 bg-slate-950/50 p-3">
            <div class="mb-2 flex items-center justify-between">
              <p class="text-sm font-semibold text-slate-200">Checklist</p>
              <span class="text-xs text-slate-400">{{ completedChecklistCount() }}/{{ checklistItems().length }} done</span>
            </div>
            <div class="mb-2 flex gap-2">
              <input
                [value]="newChecklistText()"
                (input)="newChecklistText.set($any($event.target).value)"
                class="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-2.5 py-1.5 text-xs text-slate-100 outline-none ring-sky-500/40 focus:ring-2"
                placeholder="Add checklist item"
              />
              <button
                type="button"
                (click)="addChecklistItem()"
                class="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-white/30"
              >
                Add
              </button>
            </div>
            <div class="space-y-1.5">
              @for (item of checklistItems(); track item.id) {
                <label class="flex items-center justify-between rounded-lg border border-white/10 bg-slate-900/70 px-2.5 py-2 text-xs">
                  <span class="flex items-center gap-2 text-slate-200">
                    <input type="checkbox" [checked]="item.done" (change)="toggleChecklistItem(item.id)" />
                    <span [class]="item.done ? 'text-slate-500 line-through' : 'text-slate-200'">{{ item.text }}</span>
                  </span>
                  <button type="button" (click)="removeChecklistItem(item.id)" class="text-slate-400 hover:text-rose-300">
                    Remove
                  </button>
                </label>
              }
            </div>
          </div>

          @if (taskForm.invalid && submitted) {
            <p class="text-sm text-rose-300">Please provide a title and description before submitting.</p>
          }

          <div class="flex flex-wrap items-center gap-2">
            <button
              type="submit"
              class="rounded-xl bg-gradient-to-r from-sky-400 to-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/80"
            >
              Save Task
            </button>
            <button
              type="button"
              (click)="fillTemplate('Bug Fix')"
              class="rounded-xl border px-3 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60 active:scale-[0.98]"
              [class]="
                activeTemplate() === 'Bug Fix'
                  ? 'border-rose-300/60 bg-rose-500/20 text-rose-100'
                  : 'border-white/15 text-slate-200 hover:border-white/30'
              "
            >
              Use Bug Fix Template
            </button>
            <button
              type="button"
              (click)="fillTemplate('Feature')"
              class="rounded-xl border px-3 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60 active:scale-[0.98]"
              [class]="
                activeTemplate() === 'Feature'
                  ? 'border-cyan-300/60 bg-cyan-500/20 text-cyan-100'
                  : 'border-white/15 text-slate-200 hover:border-white/30'
              "
            >
              Use Feature Template
            </button>
            <button
              type="button"
              (click)="resetForm()"
              class="rounded-xl border border-white/15 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-white/30 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60"
            >
              Clear
            </button>
          </div>
        </form>

        <aside class="space-y-4">
          <article class="rounded-2xl border border-white/10 bg-slate-900/80 p-5 ring-1 ring-white/5">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Live Preview</p>
            <h3 class="mt-3 text-lg font-semibold text-white">{{ taskForm.controls.title.value || 'Untitled task' }}</h3>
            <p class="mt-2 text-sm text-slate-300">
              {{ taskForm.controls.description.value || 'Add a meaningful description to improve team clarity.' }}
            </p>
            <div class="mt-4 flex flex-wrap gap-2 text-xs">
              <span class="rounded-full border border-white/15 bg-slate-800/70 px-2.5 py-1 text-slate-200">
                {{ taskForm.controls.priority.value }} Priority
              </span>
              <span class="rounded-full border border-white/15 bg-slate-800/70 px-2.5 py-1 text-slate-200">
                {{ taskForm.controls.status.value }}
              </span>
              <span class="rounded-full border border-white/15 bg-slate-800/70 px-2.5 py-1 text-slate-200">
                {{ taskForm.controls.assignee.value || 'Unassigned' }}
              </span>
            </div>
          </article>

          <article class="rounded-2xl border border-white/10 bg-slate-900/80 p-5 ring-1 ring-white/5">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Form Health</p>
            <p class="mt-3 text-3xl font-bold text-white">{{ formCompletion() }}%</p>
            <div class="mt-3 h-2 rounded-full bg-slate-800">
              <div class="h-2 rounded-full bg-gradient-to-r from-sky-400 to-cyan-300" [style.width.%]="formCompletion()"></div>
            </div>
            <p class="mt-3 text-xs text-slate-400">Complete all fields for a strong task brief.</p>
          </article>

          <article class="rounded-2xl border border-white/10 bg-slate-900/80 p-5 ring-1 ring-white/5">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Priority Guidance</p>
            <p class="mt-3 text-sm text-slate-300">
              @if (taskForm.controls.priority.value === 'High') {
                High priority tasks should include clear scope and due date to avoid execution risk.
              } @else if (taskForm.controls.priority.value === 'Medium') {
                Medium priority is ideal for sprint backlog items with shared dependencies.
              } @else {
                Low priority suits enhancements and polish tasks.
              }
            </p>
          </article>
        </aside>
      </div>
    </section>
  `,
  styles: [],
})
export class NewTask {
  private readonly fb = inject(FormBuilder);
  protected submitted = false;
  protected readonly showSuccess = signal(false);
  protected readonly activeTemplate = signal<'Bug Fix' | 'Feature' | null>(null);
  protected readonly newChecklistText = signal('');
  protected readonly checklistItems = signal([
    { id: 1, text: 'Acceptance criteria added', done: false },
    { id: 2, text: 'Dependencies identified', done: false },
  ]);

  protected readonly taskForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    priority: ['Medium'],
    status: ['Pending'],
    dueDate: [''],
    assignee: [''],
  });

  protected readonly titleCount = computed(() => this.taskForm.controls.title.value.length);
  protected readonly descriptionCount = computed(() => this.taskForm.controls.description.value.length);
  protected readonly descriptionProgress = computed(() => (this.descriptionCount() / 280) * 100);
  protected readonly completedChecklistCount = computed(
    () => this.checklistItems().filter((item) => item.done).length,
  );
  protected readonly formCompletion = computed(() => {
    const controls = this.taskForm.controls;
    let score = 0;
    if (controls.title.valid) score += 30;
    if (controls.description.valid) score += 30;
    if (controls.dueDate.value) score += 20;
    if (controls.assignee.value.trim()) score += 20;
    return score;
  });

  protected onSubmit(): void {
    this.submitted = true;
    if (this.taskForm.invalid) return;
    console.log('Task submitted:', this.taskForm.getRawValue());
    this.showSuccess.set(true);
    this.activeTemplate.set(null);
    setTimeout(() => this.showSuccess.set(false), 2400);
    this.resetForm();
  }

  protected fillTemplate(kind: 'Bug Fix' | 'Feature'): void {
    this.activeTemplate.set(kind);
    if (kind === 'Bug Fix') {
      this.taskForm.patchValue({
        title: 'Fix login validation edge case',
        description: 'Resolve invalid state handling when users submit empty credentials and improve error messaging.',
        priority: 'High',
        status: 'Pending',
      });
      this.checklistItems.set([
        { id: 1, text: 'Reproduce issue locally', done: false },
        { id: 2, text: 'Add unit test coverage', done: false },
        { id: 3, text: 'Validate in staging', done: false },
      ]);
      return;
    }

    this.taskForm.patchValue({
      title: 'Create onboarding analytics panel',
      description: 'Add dashboard widgets to track onboarding funnel completion and activation events.',
      priority: 'Medium',
      status: 'Pending',
    });
    this.checklistItems.set([
      { id: 1, text: 'Confirm tracking events', done: false },
      { id: 2, text: 'Design widget layout', done: false },
      { id: 3, text: 'Ship responsive implementation', done: false },
    ]);
  }

  protected addChecklistItem(): void {
    const text = this.newChecklistText().trim();
    if (!text) return;
    const nextId = Math.max(0, ...this.checklistItems().map((item) => item.id)) + 1;
    this.checklistItems.update((items) => [...items, { id: nextId, text, done: false }]);
    this.newChecklistText.set('');
  }

  protected toggleChecklistItem(id: number): void {
    this.checklistItems.update((items) =>
      items.map((item) => (item.id === id ? { ...item, done: !item.done } : item)),
    );
  }

  protected removeChecklistItem(id: number): void {
    this.checklistItems.update((items) => items.filter((item) => item.id !== id));
  }

  protected resetForm(): void {
    this.taskForm.reset({
      title: '',
      description: '',
      priority: 'Medium',
      status: 'Pending',
      dueDate: '',
      assignee: '',
    });
    this.checklistItems.set([
      { id: 1, text: 'Acceptance criteria added', done: false },
      { id: 2, text: 'Dependencies identified', done: false },
    ]);
    this.activeTemplate.set(null);
    this.submitted = false;
  }
}
