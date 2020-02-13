import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallWeatherCardComponent } from './small-weather-card.component';

describe('SmallWeatherCardComponent', () => {
  let component: SmallWeatherCardComponent;
  let fixture: ComponentFixture<SmallWeatherCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallWeatherCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallWeatherCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
