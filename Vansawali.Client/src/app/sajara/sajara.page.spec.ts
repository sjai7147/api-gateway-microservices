import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SajaraPage } from './sajara.page';

describe('SajaraPage', () => {
  let component: SajaraPage;
  let fixture: ComponentFixture<SajaraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SajaraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SajaraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
