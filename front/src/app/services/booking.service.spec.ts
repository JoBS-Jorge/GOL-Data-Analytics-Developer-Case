import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { BookingService } from './booking.services';
import { environment } from './../../../environments/environment';
import { provideHttpClient } from '@angular/common/http';

describe('BookingService', () => {
  let service: BookingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookingService,
        provideHttpClient(),
        provideHttpClientTesting()
    ]
    });

    service = TestBed.inject(BookingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Método que deve buscar as reservas utilizando GET', () => {
    const mockResponse = [{
        id: 1,
        first_name: 'João',
        last_name: 'Silva',
        document: '12345678900',
        flight_number: 'G3 1200',
        flight_date: '2024-05-01',
        created_at: '2024-05-01T12:00:00Z',
        updated_at: '2024-05-01T13:00:00Z'
    }];

  service.getBookings().subscribe((res) => {
    expect(res).toEqual(mockResponse);
  });

  const req = httpMock.expectOne(`${environment.apiUrl}/api/v1/booking`);
  expect(req.request.method).toBe('GET');
  req.flush(mockResponse);
});

it('Método que deve enviar fazer upload de um arquivo utilizando POST', () => {
  const mockFile = new File(['test'], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const mockResponse = { rows: 3 };

  service.uploadBookingsfile(mockFile).subscribe((res) => {
    expect(res).toEqual(mockResponse);
  });

  const req = httpMock.expectOne(`${environment.apiUrl}/api/v1/booking/file/upload`);
  expect(req.request.method).toBe('POST');
  expect(req.request.body.has('content')).toBeTrue();

  req.flush(mockResponse);
});

it('Método que deve enviar dados de nova reserva utilizando POST', () => {
  const newBooking = { first_name: 'Maria' };
  const mockResponse = { id: 2, ...newBooking };

  service.createBooking(newBooking).subscribe((res) => {
    expect(res).toEqual(mockResponse);
  });

  const req = httpMock.expectOne(`${environment.apiUrl}/api/v1/booking`);
  expect(req.request.method).toBe('POST');
  expect(req.request.body).toEqual(newBooking);

  req.flush(mockResponse);
});



});