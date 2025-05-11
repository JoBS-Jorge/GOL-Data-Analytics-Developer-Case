import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PassengersReservationsComponent } from './passengers-reservations.component';
import { BookingService } from '../../services/booking.services';
import { of, throwError } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomSnackBarComponent } from '../../components/custom-snack-bar/custom-snack-bar.component';

describe('PassengersReservationsComponent', () => {
  let component: PassengersReservationsComponent;
  let fixture: ComponentFixture<PassengersReservationsComponent>;
  let bookingServiceSpy: jasmine.SpyObj<BookingService>;

  const mockBookings = [
    {
      first_name: 'João',
      last_name: 'Silva',
      document: '12345678900',
      birthday: '1990-01-01',
      route: 'GYN-SDU',
      dates: '2024-05-01'
    }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('BookingService', ['getBookings', 'uploadBookingsfile', 'downloadReservationsFile']);

    await TestBed.configureTestingModule({
      imports: [PassengersReservationsComponent, MatSnackBarModule],
      providers: [
        { provide: BookingService, useValue: spy }
      ]
    }).compileComponents();

    bookingServiceSpy = TestBed.inject(BookingService) as jasmine.SpyObj<BookingService>;
    bookingServiceSpy.getBookings.and.returnValue(of(mockBookings));

    fixture = TestBed.createComponent(PassengersReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve buscar as reservas na inicialização', () => {
    expect(bookingServiceSpy.getBookings).toHaveBeenCalled();
    expect(component.dataSource.data.length).toBe(1);
    expect(component.dataSource.data[0].first_name).toBe('João');
  });

  it('deve lidar com erro ao buscar reservas', fakeAsync(() => {
    bookingServiceSpy.getBookings.and.returnValue(throwError(() => new Error('Erro de rede')));
    component.fetchBookings();
    tick();
    expect(component.dataSource.data.length).toBe(0);
  }));

  it('deve abrir e fechar o modal de reserva', () => {
    expect(component.showModal).toBeFalse();
    component.openReservationModal();
    expect(component.showModal).toBeTrue();
    component.closeReservationModal();
    expect(component.showModal).toBeFalse();
  });

  it('deve chamar downloadReservationsFile quando clicar no botão de download', () => {
    component.onDownloadClick();
    expect(bookingServiceSpy.downloadReservationsFile).toHaveBeenCalled();
  });
  
});
