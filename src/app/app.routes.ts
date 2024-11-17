import { Routes } from '@angular/router';
import { HomeComponent } from './DashBoard/home/home.component';
import { HealthMetricsComponent } from './DashBoard/healthmetrics/healthmetrics.component';
import { PhysicalComponent } from './DashBoard/physical/physical.component';
import { DietComponent } from './DashBoard/diet/diet.component';
import {  MentalHealthComponent } from './DashBoard/mental-health/mental-health.component';
import { UserProfileComponent } from './DashBoard/user-profile/user-profile.component';
import { DashBoardUserComponent } from './DashBoard/dash-board-user/dash-board-user.component';
import { DashBoardAdminComponent } from './DashBoard-Admin/dash-board-admin/dash-board-admin.component';
import { UserDetailsComponent } from './DashBoard-Admin/user-details/user-details.component';
import { ExerciseComponent } from './DashBoard-Admin/exercise/exercise.component';
import { MoodTypeComponent } from './DashBoard-Admin/mood-type/mood-type.component';


export const routes: Routes = [
{path:'dash-board-user', component: DashBoardUserComponent},
{ path: 'home', component: HomeComponent },
{ path: 'healthmetrics', component: HealthMetricsComponent },
{ path: 'physical', component: PhysicalComponent },
{ path: 'diet', component: DietComponent },
{ path: 'mental-health', component: MentalHealthComponent},
{ path: 'user-profile', component: UserProfileComponent},
{ path: '', redirectTo: 'dash-board-user', pathMatch:'full'},
{path:'dash-board-admin', component: DashBoardAdminComponent},
{path:'user-details', component: UserDetailsComponent },
{path:'exercise', component: ExerciseComponent},
{path:'mood-type', component: MoodTypeComponent},
];
