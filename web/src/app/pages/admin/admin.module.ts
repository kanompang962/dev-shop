import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ProductComponent } from './main/product/product.component';
import { UserComponent } from './main/user/user.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MainlayoutComponent } from './layouts/mainlayout/mainlayout.component';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { CreateComponent } from './main/product/create/create.component';
import { UpdateComponent } from './main/product/update/update.component';
import { MatDialogModule } from '@angular/material/dialog'; 
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NavbarComponent } from './layouts/navbar/navbar.component';

@NgModule({
  declarations: [
    AdminComponent,
    ProductComponent,
    UserComponent,
    DashboardComponent,
    MainlayoutComponent,
    CreateComponent,
    UpdateComponent,
    NavbarComponent
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
    MatPaginatorModule
  ]
})
export class AdminModule { }
