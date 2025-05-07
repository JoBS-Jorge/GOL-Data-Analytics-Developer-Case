import { Routes } from '@angular/router';
import { PassengersReservationsComponent } from './pages/passengers-reservations/passengers-reservations.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';

export const routes: Routes = [
    {
        path: 'voegol/passengers-reservations',
        component: PassengersReservationsComponent
    },
    {
        path: 'voegol/analytics',
        component: AnalyticsComponent
    },
    {
        path: '',
        redirectTo: 'voegol/passengers-reservations',
        pathMatch: 'full'
    }
];
