import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { SelectComponent } from './select/select.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SearchComponent } from './search/search.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InputComponent,
    SelectComponent,
    SearchComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  exports: [
    InputComponent,
    SelectComponent,
    SearchComponent
  ]
})
export class SharedModule { }
