import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { ProductComponent } from './main/product/product.component';
import { UserComponent } from './main/user/user.component';
import { MainlayoutComponent } from './layouts/mainlayout/mainlayout.component';
import { AuthGuardService } from 'src/app/core/guard/auth-gurad.guard';


const routes: Routes = [{ 
  path: '', component: MainlayoutComponent, 
  children: [
    {path:'', component: DashboardComponent,canActivate: [AuthGuardService],},
    {path:'dashboard', component: DashboardComponent,  canActivate: [AuthGuardService],},
    {path:'products', component: ProductComponent,  canActivate: [AuthGuardService],},
    {path:'users', component: UserComponent,  canActivate: [AuthGuardService],},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
