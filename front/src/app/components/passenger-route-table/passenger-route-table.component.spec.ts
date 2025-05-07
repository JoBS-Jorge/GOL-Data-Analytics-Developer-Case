import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerRouteTableComponent } from './passenger-route-table.component';

describe('PassengerRouteTableComponent', () => {
  let component: PassengerRouteTableComponent;
  let fixture: ComponentFixture<PassengerRouteTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassengerRouteTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerRouteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
