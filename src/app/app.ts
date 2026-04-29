import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/layout/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  template: `
    <div
      class="flex h-screen flex-col overflow-hidden bg-slate-950 bg-[radial-gradient(circle_at_top,#1e293b_0%,#0f172a_35%,#020617_80%)]"
    >
      <app-header />
      <main class="min-h-0 flex-1 overflow-hidden pb-6">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [],
})
export class App {
  // Root shell component for routed pages.
}
