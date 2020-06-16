import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAndCardsComponent } from './user-and-cards.component';

describe('UserAndCardsComponent', () => {
  let component: UserAndCardsComponent;
  let fixture: ComponentFixture<UserAndCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAndCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAndCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
