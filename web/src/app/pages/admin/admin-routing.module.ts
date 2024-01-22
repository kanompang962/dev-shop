import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { ProductComponent } from './main/product/product.component';
import { UserComponent } from './main/user/user.component';
import { MainlayoutComponent } from './layouts/mainlayout/mainlayout.component';


const routes: Routes = [{ 
  path: '', component: MainlayoutComponent, 
  children: [
    {path:'', component: DashboardComponent},
    {path:'dashboard', component: DashboardComponent},
    {path:'products', component: ProductComponent},
    {path:'users', component: UserComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
