import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {

  @Input() placehoder = ''
  @Input() options: { value: number, label: string }[] = [];
  @Output() selectionChange = new EventEmitter<any>();
  selectedValue: number = 0;

  onSelectionChange() {
    this.selectionChange.emit(this.selectedValue);
  }
}