import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { AnalyticsComponent } from './analytics.component';
import { BookingService } from '../../services/booking.services';
import { of, throwError } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AnalyticsComponent', () => {
  let component: AnalyticsComponent;
  let fixture: ComponentFixture<AnalyticsComponent>;
  let bookingServiceSpy: jasmine.SpyObj<BookingService>;

  const mockChartData = [
    { date: '2024-01-01', iatapair: 'ABC123', departures: 50, arrivals: 40 },
    { date: '2024-01-02', iatapair: 'XYZ456', departures: 30, arrivals: 20 },
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('BookingService', [
      'getPassengerDeparturesByDate',
      'getPassengerArrivalsByDate',
      'getPassengerByRoute',
      'getPassengerTrafficByRoute'
    ]);

    await TestBed.configureTestingModule({
      imports: [AnalyticsComponent],
      providers: [
        { provide: BookingService, useValue: spy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Ignora componentes filhos standalone
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsComponent);
    component = fixture.componentInstance;
    bookingServiceSpy = TestBed.inject(BookingService) as jasmine.SpyObj<BookingService>;

    // Valores de retorno simulados
    bookingServiceSpy.getPassengerDeparturesByDate.and.returnValue(of({ data: mockChartData }));
    bookingServiceSpy.getPassengerArrivalsByDate.and.returnValue(of({ data: mockChartData }));
    bookingServiceSpy.getPassengerByRoute.and.returnValue(of({ data: mockChartData }));
    bookingServiceSpy.getPassengerTrafficByRoute.and.returnValue(of({ data: mockChartData }));
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar os dados dos gráficos no ngOnInit', fakeAsync(() => {
    fixture.detectChanges(); // dispara ngOnInit

    flush(); // resolve os Observables

    expect(component.chartDataDepartures.length).toBe(2);
    expect(component.chartDataArrivals.length).toBe(2);
    expect(component.chartDataByRoute.length).toBe(2);

    expect(bookingServiceSpy.getPassengerDeparturesByDate).toHaveBeenCalled();
    expect(bookingServiceSpy.getPassengerArrivalsByDate).toHaveBeenCalled();
    expect(bookingServiceSpy.getPassengerByRoute).toHaveBeenCalled();
  }));

  it('deve atribuir paginator e sort no ngAfterViewInit', () => {
    component.paginator = {} as MatPaginator;
    component.sort = {} as MatSort;

    component.ngAfterViewInit();

    expect(component.dataSource.paginator).toBe(component.paginator);
    expect(component.dataSource.sort).toBe(component.sort);
  });

  it('deve tratar erro ao carregar dados', () => {
    const consoleSpy = spyOn(console, 'error');
    bookingServiceSpy.getPassengerDeparturesByDate.and.returnValue(throwError(() => new Error('Erro de API')));

    component.fetchChartData();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Erro ao carregar dados do gráfico:',
      jasmine.any(Error)
    );
  });
});
