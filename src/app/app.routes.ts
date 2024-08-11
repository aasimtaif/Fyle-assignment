import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WorkoutDetailsComponent } from './wokrout-details/wokrout-details.component';
export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: "workout/:id",
        component: WorkoutDetailsComponent
    }
];
