/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddCityComponent } from './addCity.component';

describe('AddCityComponent', () => {
  let component: AddCityComponent;
  let fixture: ComponentFixture<AddCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCityComponent ]
    })
    .compileComponents();
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
