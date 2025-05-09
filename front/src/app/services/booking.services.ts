import { environment } from './../../../environments/environment';
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/v1/booking';

  // Método de autenticação
  private getEncryptedToken(): string {
    const authTokenPass = environment.authTokenPass;

    const authTokenKey = CryptoJS.enc.Base64.parse(environment.authTokenKey);
    const authTokenIv = CryptoJS.enc.Utf8.parse(environment.authTokenIv);

    const encryptedToken = CryptoJS.AES.encrypt(
      authTokenPass,
      authTokenKey,
      {
        iv: authTokenIv,
        mode: CryptoJS.mode.CBC
      }
    ).toString();

    return encryptedToken;
  }

  /* Métodos utilizados na tela de reservas */
  /* ###################################### */

  // Método que busca todos os registros de reservas
  getBookings(): Observable<any> {
    const token = this.getEncryptedToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }

  // Método para criar uma nova reserva
  createBooking(data: any): Observable<any> {
    const token = this.getEncryptedToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl, data, {headers})
  }

  // Método que faz o download das reservas em um arquivo excel
  downloadReservationsFile(): void {
    const token = this.getEncryptedToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    const url = `${this.apiUrl}/file/download`;
  
    this.http.get(url, {
      headers,
      responseType: 'blob' // importante para lidar com arquivos
    }).subscribe(blob => {
      const downloadLink = document.createElement('a');
      const objectURL = URL.createObjectURL(blob);
  
      downloadLink.href = objectURL;
      downloadLink.download = 'reservas.xlsx'; // ou .csv, dependendo do tipo retornado
      downloadLink.click();
  
      URL.revokeObjectURL(objectURL);
    });
  }

  uploadBookingsfile(file: File): Observable<{ rows: number }> {
    const formData = new FormData();
    formData.append('content', file, file.name);
  
    const token = this.getEncryptedToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    const url = 'http://localhost:8000/api/v1/booking/file/upload';
    return this.http.post<{ rows: number }>(url, formData, { headers });
  }
  
  /* Métodos utilizados na tela analytics */
  /* #################################### */

  getPassengerDeparturesByDate(): Observable<any> {
    const token = this.getEncryptedToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    const url = 'http://localhost:8000/api/v1/dashboard/chart/data/1';
    return this.http.get<any>(url, { headers })
  }

  getPassengerArrivalsByDate(): Observable<any> {
    const token = this.getEncryptedToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    const url = 'http://localhost:8000/api/v1/dashboard/chart/data/2';
    return this.http.get<any>(url, { headers })
  } 

  getPassengerByRoute(): Observable<any> {
    const token = this.getEncryptedToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    const url = 'http://localhost:8000/api/v1/dashboard/chart/data/3';
    return this.http.get<any>(url, { headers })
  }

  getPassengerTrafficByRoute(): Observable<any> {
    const token = this.getEncryptedToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    const url = 'http://localhost:8000/api/v1/dashboard/data';
    return this.http.get<any>(url, { headers })
  }

}
