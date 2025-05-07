import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengersReservationsComponent } from './passengers-reservations.component';

describe('PassengersReservationsComponent', () => {
  let component: PassengersReservationsComponent;
  let fixture: ComponentFixture<PassengersReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassengersReservationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengersReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
