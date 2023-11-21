import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'counter', loadComponent: () => import('./counter/counter.component').then(m => m.CounterComponent), title: 'Counter'
    },
    {
        path: 'avatar-service', loadComponent: () => import('./avatar-service/avatar-service.component').then(m => m.ErrorServiceComponent), title: 'Error Service'
    }
];
