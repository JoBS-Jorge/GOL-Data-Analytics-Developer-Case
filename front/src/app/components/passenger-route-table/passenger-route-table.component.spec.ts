import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PassengerRouteTableComponent } from './passenger-route-table.component';
import { BookingService } from '../../services/booking.services';
import { of, throwError } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PassengerRouteTableComponent', () => {
  let component: PassengerRouteTableComponent;
  let fixture: ComponentFixture<PassengerRouteTableComponent>;
  let bookingServiceSpy: jasmine.SpyObj<BookingService>;

  const mockTrafficData = [
    { date: '2024-01-01', iatapair: 'SFOJFK', departures: 50, arrivals: 40 },
    { date: '2024-01-02', iatapair: 'LAXMIA', departures: 30, arrivals: 20 },
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('BookingService', ['getPassengerTrafficByRoute']);

    await TestBed.configureTestingModule({
      imports: [PassengerRouteTableComponent, MatTableModule, MatPaginatorModule, MatSortModule],
      providers: [
        { provide: BookingService, useValue: spy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PassengerRouteTableComponent);
    component = fixture.componentInstance;
    bookingServiceSpy = TestBed.inject(BookingService) as jasmine.SpyObj<BookingService>;

    // Valores de retorno simulados
    bookingServiceSpy.getPassengerTrafficByRoute.and.returnValue(of({ data: mockTrafficData }));
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar os dados na tabela', () => {
    fixture.detectChanges(); // Dispara ngOnInit

    expect(component.dataSource.data.length).toBe(2);
    expect(component.dataSource.data[0].date).toBeTruthy(); // A data não deve ser nula
  });

  it('deve exibir "Data inválida" se a data for inválida', () => {
    // Mock de dados com data inválida
    const invalidData = [{ date: 'Invalid Date', iatapair: 'SFOJFK', departures: 50, arrivals: 40 }];
    bookingServiceSpy.getPassengerTrafficByRoute.and.returnValue(of({ data: invalidData }));

    fixture.detectChanges(); // Dispara ngOnInit

    const tableRows = fixture.nativeElement.querySelectorAll('td');
    expect(tableRows[0].textContent).toContain('Data inválida'); // Verifica se "Data inválida" é exibido
  });

  it('deve tratar erro ao carregar os dados', () => {
    const consoleSpy = spyOn(console, 'error');
    bookingServiceSpy.getPassengerTrafficByRoute.and.returnValue(throwError(() => new Error('Erro de API')));

    fixture.detectChanges(); // Dispara ngOnInit

    expect(consoleSpy).toHaveBeenCalledWith('Erro ao carregar dados:', jasmine.any(Error));
  });
});
