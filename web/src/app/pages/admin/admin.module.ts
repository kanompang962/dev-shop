import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ProductComponent } from './main/product/product.component';
import { UserComponent } from './main/user/user.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MainlayoutComponent } from './layouts/mainlayout/mainlayout.component';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { CreateComponent as CreateProduct }  from './main/product/create/create.component';
import { UpdateComponent as UpdateProduct } from './main/product/update/update.component';
import { MatDialogModule } from '@angular/material/dialog'; 
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgApexchartsModule } from "ng-apexcharts";
import { SettingComponent } from './main/setting/setting.component';
import { FormsModule } from '@angular/forms';
import { CreateComponent as CreateUser } from './main/user/create/create.component';
import { UpdateComponent as UpdateUser } from './main/user/update/update.component';

@NgModule({
  declarations: [
    AdminComponent,
    ProductComponent,
    UserComponent,
    DashboardComponent,
    MainlayoutComponent,
    CreateProduct,
    UpdateProduct,
    CreateUser,
    UpdateUser,
    NavbarComponent,
    SettingComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    SharedModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatExpansionModule,
    NgApexchartsModule,
    MatMenuModule,
    FormsModule
  ]
})
export class AdminModule { }
