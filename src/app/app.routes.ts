import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '**',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        title: "Вход",
        loadComponent: () => import('./pages/auth/auth.component').then((c) => c.AuthComponent)
    }
];
