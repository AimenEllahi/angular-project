import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'tasks/:id',
    loadComponent: () =>
      import('./pages/task-details/task-details').then((m) => m.TaskDetails),
  },
  {
    path: 'new-task',
    loadComponent: () =>
      import('./pages/new-task/new-task').then((m) => m.NewTask),
  },

  { path: '**', redirectTo: 'dashboard' },
];