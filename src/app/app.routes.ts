import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'applications'
  },
  {
    path: 'auth',
    title: 'Вход',
    loadComponent: () => import('./pages/auth/auth.component').then(c => c.AuthComponent),
  },
  {
    path: '',
    canActivateChild: [authGuard],
    loadComponent: () => import('./pages/components/layout/layout.component').then(c => c.LayoutComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'applications'
      },
      {
        path: 'applications',
        title: 'Анкеты',
        loadComponent: () => import('./pages/applications/applications.component').then(c => c.ApplicationsComponent),
      },
      {
        path: 'applications/:id',
        title: 'Карточка кандидата',
        loadComponent: () => import('./pages/application-details/application-details.component').then(c => c.ApplicationDetailsComponent)
      },
      {
        path: 'profiles',
        title: 'Профили',
        loadComponent: () => import('./pages/profiles/profiles.component').then(c => c.ProfilesComponent),
      },
      {
        path: 'profiles/:id',
        title: 'Профиль кандидата',
        loadComponent: () => import('./pages/profile-details/profile-details.component').then(c => c.ProfileDetailsComponent)
      },
      {
        path: 'stats',
        title: 'Статистика',
        loadComponent: () => import('./pages/stats/stats.component').then(c => c.StatsComponent)
      },
      {
        path: 'moodle',
        title: 'Moodle',
        loadComponent: () => import('./pages/moodle/moodle.component').then(c => c.MoodleComponent)
      },
      {
        path: 'moodle/:id',
        title: 'Moodle результаты',
        loadComponent: () => import('./pages/moodle-details/moodle-details.component').then(c => c.MoodleDetailsComponent)
      },
      {
        path: 'account-management',
        title: 'Аккаунты',
        loadComponent: () => import('./pages/account-management/account-management.component').then(c => c.AccountManagementComponent)
      },
      {
        path: 'system-journal',
        title: 'Системный журнал',
        loadComponent: () => import('./pages/system-journal/system-journal.component').then(c => c.SystemJournalComponent)
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/applications',
    pathMatch: 'full'
  },
];
