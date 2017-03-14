/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FooderMainComponent } from './fooder-main.component';

describe('FooderMainComponent', () => {
  let component: FooderMainComponent;
  let fixture: ComponentFixture<FooderMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooderMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooderMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
