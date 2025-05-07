import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsSearchComponent } from './reservations-search.component';

describe('ReservationsSearchComponent', () => {
  let component: ReservationsSearchComponent;
  let fixture: ComponentFixture<ReservationsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationsSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
