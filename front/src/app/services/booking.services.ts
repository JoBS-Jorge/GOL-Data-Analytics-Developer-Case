import { environment } from './../../../environments/environment';
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private http = inject(HttpClient);

  /* Métodos utilizados na tela de reservas */
  /* ###################################### */

  // Método que busca todos os registros de reservas
  getBookings(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/v1/booking`);
  }

  // Método para criar uma nova reserva
  createBooking(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/v1/booking`, data)
  }

  // Método que faz o download das reservas em um arquivo excel
  downloadReservationsFile(): void {
    const url = `${environment.apiUrl}/api/v1/booking/file/download`;  
    this.http.get(url, {
      responseType: 'blob'
    }).subscribe(blob => {
      const downloadLink = document.createElement('a');
      const objectURL = URL.createObjectURL(blob);
  
      downloadLink.href = objectURL;
      downloadLink.download = 'reservas.xlsx';
      downloadLink.click();
  
      URL.revokeObjectURL(objectURL);
    });
  }

  uploadBookingsfile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('content', file);
  
    const url = `${environment.apiUrl}/api/v1/booking/file/upload`;
    return this.http.post<{ rows: number }>(url, formData);
  }
  
  /* Métodos utilizados na tela analytics */
  /* #################################### */

  getPassengerDeparturesByDate(): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/dashboard/chart/data/1`;
    return this.http.get<any>(url)
  }

  getPassengerArrivalsByDate(): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/dashboard/chart/data/2`;
    return this.http.get<any>(url)
  } 

  getPassengerByRoute(): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/dashboard/chart/data/3`;
    return this.http.get<any>(url)
  }

  getPassengerTrafficByRoute(): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/dashboard/data`;
    return this.http.get<any>(url)
  }

}
