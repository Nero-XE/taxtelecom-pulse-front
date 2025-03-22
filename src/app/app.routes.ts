import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        title: "Вход",
        loadComponent: () => import('./pages/auth/auth.component').then((c) => c.AuthComponent)
    },
    {
        path: 'main',
        loadComponent: () => import('./pages/main/main.component').then((c) => c.MainComponent),
        children: [
            {
                path: '',
                redirectTo: 'applications',
                pathMatch: 'full'
            },
            {
                path: 'search',
                title: "Поиск",
                loadComponent: () => import('./pages/main/pages/search/search.component').then((c) => c.SearchComponent),
            },
            {
                path: 'profiles',
                title: "Профили",
                loadComponent: () => import('./pages/main/pages/profiles/profiles.component').then((c) => c.ProfilesComponent),
            },
            {
                path: 'applications',
                title: "Анкеты",
                loadComponent: () => import('./pages/main/pages/applications/applications.component').then((c) => c.ApplicationsComponent),
            },
            {
                path: 'moodle',
                title: "Moodle",
                loadComponent: () => import('./pages/main/pages/moodle/moodle.component').then((c) => c.MoodleComponent),
            },
            {
                path: 'statistics',
                title: "Статистика",
                loadComponent: () => import('./pages/main/pages/statistics/statistics.component').then((c) => c.StatisticsComponent),
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'auth',
        pathMatch: 'full'
    }
];
