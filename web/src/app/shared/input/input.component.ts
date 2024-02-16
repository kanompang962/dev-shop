import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgModel, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, OnInit{

  @Input() type: string = 'text';
  @Input() row: number = 4;
  @Input() disabled: boolean = false;
  @Input() placeholder: string = '';
  @Input() inputValue: string = '';
  @Output() inputValueChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() label: string = '';
  @Input() name: string = '';
  @Input() formControl: FormControl = new FormControl; // Use 'any' if you want to keep it flexible

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    // Set the value from the form control
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Implement if needed
  }

  onInputChange(event: any): void {
    if (this.type == 'number') {
      this.onChange(parseInt(event.target.value));
    }else {
      this.onChange(event.target.value);
    }
  }


  ngOnInit(): void {

  }

  onValueChange(value: string): void {
    this.inputValue = value;
    this.inputValueChange.emit(value);
  }
}
