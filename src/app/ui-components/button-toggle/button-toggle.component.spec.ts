import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonToggleComponent } from './button-toggle.component';

describe('ButtonToggleComponent', () => {
  let component: ButtonToggleComponent;
  let fixture: ComponentFixture<ButtonToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonToggleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('writeValue', () => {
    it('should call selectOption() method', () => {
      const spy = spyOn(component, 'selectOption');

      component.writeValue('a');

      expect(spy).toHaveBeenCalledWith('a');
    });
  });

  describe('registerOnChange', () => {
    it('should set onChange property with the value passed in its argument', () => {
      component.registerOnChange('a');

      expect(component.onChange).toBe('a');
    });
  });

  describe('registerOnChange', () => {
    it('should set onChange property with the value passed in its argument', () => {
      component.registerOnTouched('a');

      expect(component.onTouch).toBe('a');
    });
  });

  describe('setDisableState', () => {
    it('should set isDisabled property with value passed in its argument', () => {
      component.setDisabledState(true);
      expect(component.isDisabled).toBeTruthy();

      component.setDisabledState(false);
      expect(component.isDisabled).toBeFalsy();
    });
  });

  describe('ngOnInit', () => {
    it('should set selectedOption property with first element of options array', () => {
      const options = [
        { value: 'a', name: 'a' },
        { value: 'b', name: 'b' },
      ];

      component.options = options;

      component.ngOnInit();

      expect(component.selectedOption).toEqual(options[0]);
    });
  });

  describe('selectOption', () => {
    it('should set selectedOption property with an option from the array od options based on the given value', () => {
      const options = [
        { value: 'a', name: 'a' },
        { value: 'b', name: 'b' },
      ];

      component.options = options;
      component.selectedOption = options[0];

      component.selectOption('b');

      expect(component.selectedOption).toEqual(options[1]);
    });
  });
});
