import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a routerLink="/dashboard" class="flex items-center gap-3 text-white">
          <span
            class="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-sky-400 to-cyan-300 text-xs font-black text-slate-950"
          >
            TB
          </span>
          <span class="text-lg font-semibold tracking-tight">TaskBoard Pro</span>
        </a>

        <nav class="flex items-center gap-2 text-sm">
          <a
            routerLink="/dashboard"
            routerLinkActive="bg-white/10 text-white"
            [routerLinkActiveOptions]="{ exact: true }"
            class="rounded-lg px-3 py-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            Dashboard
          </a>
          <a
            routerLink="/new-task"
            routerLinkActive="bg-white/10 text-white"
            class="rounded-lg px-3 py-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            New Task
          </a>
        </nav>
      </div>
    </header>
  `,
  styles: [],
})
export class Header {}
