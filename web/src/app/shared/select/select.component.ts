import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {

  @Input() placehoder = ''
  @Input() options: { value: any, label: string }[] = [];
  @Output() selectionChange = new EventEmitter<any>();
  selectedValue: any;

  onSelectionChange() {
    this.selectionChange.emit(this.selectedValue);
  }
}