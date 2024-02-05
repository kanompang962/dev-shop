import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { SelectComponent } from './select/select.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    InputComponent,
    SelectComponent,
    SearchComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule
  ],
  exports: [
    InputComponent,
    SelectComponent,
    SearchComponent
  ]
})
export class SharedModule { }
