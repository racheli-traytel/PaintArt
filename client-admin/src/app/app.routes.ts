import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ShowUsersComponent } from '../components/show-users/show-users.component';
import { LoginComponent } from '../components/login/login.component';
import { UserStatisticsComponent } from '../components/user-statistics/user-statistics.component';
import { DrawingManagementComponent } from '../components/drawing-management/drawing-management.component';

export const routes: Routes = [

    {path:'',component:LoginComponent},
    {path:"home",component:HomeComponent,children:
    [
        {path:'show-users',component:ShowUsersComponent},
        {path:'UserGrowth',component:UserStatisticsComponent},
        {path:'drawings',component:DrawingManagementComponent}

    ]},
    

];
