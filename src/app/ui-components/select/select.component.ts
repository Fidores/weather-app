import { SelectOption } from './../../models/CustomSelect';
import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, ElementRef, forwardRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

import { fadeInAnimation, fadeOutAnimation } from './../../animations';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  animations: [ 
    trigger('expand', [
      transition(':enter', useAnimation(fadeInAnimation, { params: { duration: '0.2s' } })),
      transition(':leave', useAnimation(fadeOutAnimation, { params: { duration: '0.2s' } }))
    ])
  ],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => SelectComponent) }
  ]
})
export class SelectComponent implements OnInit, ControlValueAccessor {

  constructor(
    private readonly hostRef: ElementRef<HTMLElement>
  ) { }

  private _currentOptionIndex: number = 0;
  private _isExpanded: boolean = false;
  private onChange: Function = () => {};
  private onTouched: Function = () => {};

  faArrowDown = faArrowDown;

  @Input('options') options: SelectOption[] = [];

  @ViewChild('select', {static: true}) select: ElementRef<HTMLSelectElement>;
  
  @HostListener('document:click', ['$event']) onOutsideClick($event: MouseEvent) { 
    if(!this.hostRef.nativeElement.contains($event.target as Node)) this.closeSelect();
  };

  writeValue(value: any): void { this.selectOption(value); }

  registerOnChange(fn: any): void { this.onChange = fn; }

  registerOnTouched(fn: any): void { this.onTouched = fn; }

  ngOnInit() {}

  /**
   * Function used for focusing options in select.
   * @param value value of the option.
   */

  selectOption(value: string) {
    const index = this.findIndexOf(value);
    if(index < 0) return;
    this._currentOptionIndex = index;
    this.closeSelect();
  }

  /**
   * Function used for changing between collapsed and expanded states.
   */

  toggleSelect(): void {
    this._isExpanded = !this._isExpanded;
  }

  /**
   * Function used for collapsing options.
   */

  closeSelect(): void {
    this._isExpanded = false;
  }

  /**
   * It finds index of the option based on passed value. 
   * @param value value of the option.
   * @returns index of the option.
   */

  findIndexOf(value: string): number {
    return this.options.findIndex(option => option.value === value);
  }

  /**
   * It tells the form that a new option has been selected.
   */

  broadcastChange(newValue: string): void {
    this.onChange(newValue);
    this.onTouched(newValue);
    this.selectOption(newValue);
  }

  get currentOptionIndex(): number {
    return this._currentOptionIndex;
  }

  get isExpanded(): boolean {
    return this._isExpanded;
  }

}