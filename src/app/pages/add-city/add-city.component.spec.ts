import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './../../ui-components/loader/loader.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCityComponent } from './add-city.component';
import { ToastrModule } from 'ngx-toastr';

describe('AddCityComponent', () => {
  let component: AddCityComponent;
  let fixture: ComponentFixture<AddCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddCityComponent, LoaderComponent],
      imports: [
        NgScrollbarModule,
        HttpClientTestingModule,
        RouterModule.forRoot([]),
        ToastrModule.forRoot(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
