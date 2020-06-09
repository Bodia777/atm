import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmSoftwareComponent } from './atm-software.component';

describe('AtmSoftwareComponent', () => {
  let component: AtmSoftwareComponent;
  let fixture: ComponentFixture<AtmSoftwareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtmSoftwareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtmSoftwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
