import { City } from './../../models/City';
import { CitiesService } from './../../services/cities/cities.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedCitiesComponent } from './saved-cities.component';
import { Injector } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('SavedCitiesComponent', () => {
  let component: SavedCitiesComponent;
  let fixture: ComponentFixture<SavedCitiesComponent>;
  let injector: Injector;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SavedCitiesComponent],
      imports: [HttpClientModule, FontAwesomeModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedCitiesComponent);
    component = fixture.componentInstance;
    injector = fixture.debugElement.injector;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call service to get saved cities', done => {
      const cities: CitiesService = injector.get(CitiesService);
      const spy = spyOn(cities, 'getCities').and.returnValue(of([] as City[]));

      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
      done();
    });

    it('should set cities property with data returned from server', done => {
      const cities: City[] = [{ name: 'name' }] as City[];
      const citiesService: CitiesService = injector.get(CitiesService);
      spyOn(citiesService, 'getCities').and.returnValue(of(cities));

      component.ngOnInit();
      citiesService.getCities().subscribe(cities => {
        expect(component.cities).toEqual(cities);
        done();
      });
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from all subscriptions', done => {
      const spy = spyOn(component.subscriptions, 'unsubscribe');

      component.ngOnDestroy();

      expect(spy).toHaveBeenCalled();
      done();
    });
  });

  describe('deleteCity', () => {
    it('should be called after button was clicked', done => {
      component.cities = ([{ id: 1 }] as unknown) as City[];
      fixture.detectChanges();
      const de = fixture.debugElement.query(By.css('.city__remove .btn'));
      const el: HTMLElement = de.nativeElement;
      const spy = spyOn(component, 'deleteCity');

      el.dispatchEvent(new Event('click'));

      expect(spy).toHaveBeenCalledWith(1);
      done();
    });

    it('should call service to delete city', done => {
      const cities: CitiesService = injector.get(CitiesService);
      const spy = spyOn(cities, 'deleteCity').and.returnValue(of([]));

      component.cities = ([{ id: 1 }] as unknown) as City[];
      component.deleteCity(1);

      expect(spy).toHaveBeenCalledWith(1);
      done();
    });

    it('should remove city from cities array', done => {
      component.cities = ([
        { id: 1, name: 'a' },
        { id: 2, name: 'b' },
      ] as unknown) as City[];

      component.deleteCity(1);

      expect(component.cities[0].name).toBe('b');
      done();
    });
  });
});
