import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationModalComponent } from './reservation-modal.component';
import { BookingService } from '../../services/booking.services';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomSnackBarComponent } from '../custom-snack-bar/custom-snack-bar.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

describe('ReservationModalComponent', () => {
  let component: ReservationModalComponent;
  let fixture: ComponentFixture<ReservationModalComponent>;
  let bookingService: BookingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatDialogModule,
        HttpClientModule // Usado para garantir o uso do HttpClient
      ],
      declarations: [ReservationModalComponent, CustomSnackBarComponent],
      providers: [
        BookingService,
        { provide: MAT_DIALOG_DATA, useValue: {} } // mock do MAT_DIALOG_DATA se necessário
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationModalComponent);
    component = fixture.componentInstance;
    bookingService = TestBed.inject(BookingService);

    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve enviar a reserva com sucesso', () => {
    const reservationData = {
      first_name: 'Jorge',
      last_name: 'Braz',
      birthday: '1990-01-01',
      document: '123456789',
      departure_date: '2025-06-01',
      departure_iata: 'GIG',
      arrival_iata: 'GRU',
      arrival_date: '2025-06-01',
    };

    // Mock da resposta do serviço
    const mockResponse = { success: true };

    // Mock do método createBooking
    spyOn(bookingService, 'createBooking').and.returnValue(of(mockResponse));

    // Preenche o formulário com os dados mockados
    component.form.setValue(reservationData);

    // Chama o método submit
    component.submit();

    // Verifica se o método foi chamado
    expect(bookingService.createBooking).toHaveBeenCalledWith(reservationData);
  });
});
