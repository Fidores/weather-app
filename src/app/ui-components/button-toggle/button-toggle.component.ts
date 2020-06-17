import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { SelectOption } from './../../models/CustomSelect';

@Component({
  selector: 'button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ButtonToggleComponent),
    },
  ],
})
export class ButtonToggleComponent implements OnInit, ControlValueAccessor {
  constructor() {}

  @Input('options')
  options: SelectOption[] = [];
  selectedOption: SelectOption;
  isDisabled: boolean = false;
  onChange: any;
  onTouch: any;

  writeValue(unit: any): void {
    this.selectOption(unit);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit(): void {
    this.selectedOption = this.options[0];
  }

  selectOption(value: string): void {
    if (this.selectedOption.value === value) return;
    this.selectedOption = this.options.find(option => option.value === value);
  }
}
