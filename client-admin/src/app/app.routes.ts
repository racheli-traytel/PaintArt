import { Routes } from '@angular/router';
import { AuthComponent } from '../components/auth/auth.component';
import { HomeComponent } from '../components/home/home.component';
import { ShowUsersComponent } from '../components/show-users/show-users.component';
import { AddUserComponent } from '../components/add-user/add-user.component';
import { UserGrowthComponent } from '../components/user-growth/user-growth.component';

export const routes: Routes = [

    {path:'',component:AuthComponent},
    {path:"home",component:HomeComponent,children:[
        {path:'show-users',component:ShowUsersComponent},
        { path:'add-user',component:AddUserComponent},
        // { path:'file-upload',component:UploadFileComponent},
        {path:'UserGrowth',component:UserGrowthComponent}

    ]},
    

];
