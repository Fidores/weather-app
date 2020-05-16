import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';
import { By } from '@angular/platform-browser';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectComponent],
      imports: [FontAwesomeModule, NgScrollbarModule, BrowserAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('custom made select bindings', () => {
    it('should close menu when a click event is fired on outside of the select', done => {
      const spy = spyOn(component, 'closeSelect');

      document.dispatchEvent(new Event('click'));

      expect(spy).toHaveBeenCalled();
      done();
    });

    it('should have an expanded modificator if it is expanded', done => {
      const de = fixture.debugElement.query(By.css('.select__option--current'));
      const el: HTMLDivElement = de.nativeElement;

      component['_isExpanded'] = true;
      fixture.detectChanges();

      expect(el.classList.contains('select__option--current')).toBeTruthy();
      done();
    });

    it('should expand option list when clicked', done => {
      component.options.push({ value: 'a', name: 'a' });
      fixture.detectChanges();
      const de = fixture.debugElement.query(By.css('.select__option--current'));
      const el: HTMLDivElement = de.nativeElement;
      const spy = spyOn(component, 'toggleSelect');

      el.dispatchEvent(new Event('click'));
      expect(spy).toHaveBeenCalled();

      done();
    });

    it('should display the name of the currently selected option', done => {
      component.options.push({ value: 'a', name: 'a' });
      component.options.push({ value: 'b', name: 'b' });
      fixture.detectChanges();
      const de = fixture.debugElement.query(By.css('.select__option--current'));
      const el: HTMLDivElement = de.nativeElement;

      component['_currentOptionIndex'] = 0;
      expect(el.innerText).toMatch('a');

      component['_currentOptionIndex'] = 1;
      fixture.detectChanges();
      expect(el.innerText).toMatch('b');

      done();
    });

    it('should display placeholder if no options are available', done => {
      component.options = [];
      fixture.detectChanges();
      const de = fixture.debugElement.query(
        By.css('.select__option--placeholder')
      );
      const el: HTMLDivElement = de.nativeElement;

      expect(el).toBeTruthy();
      done();
    });

    it('should hide the option list if isExpanded property is set to false', done => {
      component['_isExpanded'] = false;
      fixture.detectChanges();
      const de = fixture.debugElement.query(By.css('.select__options'));

      expect(de).toBeFalsy();
      done();
    });

    it('should show the option list if isExpanded property is set to true', done => {
      component['_isExpanded'] = true;
      fixture.detectChanges();
      const de = fixture.debugElement.query(By.css('.select__options'));

      expect(de.nativeElement).toBeTruthy();
      done();
    });
  });

  describe('placeholder select bindings', () => {
    it('should change its value based on index of current option', done => {
      const de = fixture.debugElement.query(By.css('.select__placeholder'));
      const el: HTMLSelectElement = de.nativeElement;

      component.options = [
        { name: 'a', value: 'a' },
        { name: 'b', value: 'b' },
        { name: 'c', value: 'c' },
      ];

      (component['_currentOptionIndex'] as any) = 1;

      fixture.detectChanges();

      expect(el.value).toBe('b');
      done();
    });

    it('should reflect changes on custom made select', done => {
      const de = fixture.debugElement.query(By.css('.select__placeholder'));
      const el: HTMLSelectElement = de.nativeElement;
      const spy = spyOn(component, 'selectOption');

      component.options = [
        { name: 'a', value: 'a' },
        { name: 'b', value: 'b' },
        { name: 'c', value: 'c' },
      ];

      fixture.detectChanges();

      el.value = 'c';
      el.dispatchEvent(new Event('input'));

      expect(spy).toHaveBeenCalledWith('c');
      done();
    });
  });

  describe('selectOption', () => {
    it('should set the index of the current option if it exists in array', done => {
      component.options.push({ value: 'a', name: 'a' });
      component.options.push({ value: 'b', name: 'b' });

      component.selectOption('a');
      expect(component.currentOptionIndex).toBe(0);

      component.selectOption('b');
      expect(component.currentOptionIndex).toBe(1);
      done();
    });

    it('should close the select', done => {
      const spy = spyOn(component, 'closeSelect');

      component.options.push({ value: 'a', name: 'a' });
      component.selectOption('a');

      expect(spy).toHaveBeenCalled();
      done();
    });
  });

  describe('toggleSelect', () => {
    it('should toggle isExpanded property', done => {
      component['_isExpanded'] = false;

      component.toggleSelect();
      expect(component.isExpanded).toBeTruthy();

      component.toggleSelect();
      expect(component.isExpanded).toBeFalsy();
      done();
    });
  });

  describe('findIndexOf', () => {
    it('should return index of option if it exists', done => {
      component.options.push({ value: 'a', name: 'a' });
      component.options.push({ value: 'b', name: 'b' });

      expect(component.findIndexOf('a')).toBe(0);
      expect(component.findIndexOf('b')).toBe(1);
      done();
    });

    it('should return index lesser than 0 if option does not exist', done => {
      expect(component.findIndexOf('a')).toBeLessThan(0);
      done();
    });
  });

  describe('broadcastChange', () => {
    it('should broadcast that an option has been changed', done => {
      const spy = spyOn(component as any, 'onChange');

      component['broadcastChange']('a');

      expect(spy).toHaveBeenCalledWith('a');
      done();
    });

    it('should select new option', done => {
      const spy = spyOn(component, 'selectOption');

      component['broadcastChange']('a');

      expect(spy).toHaveBeenCalledWith('a');
      done();
    });
  });
});
