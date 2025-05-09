import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { StandardButtonComponent } from "../standard-button/standard-button.component";
import { BookingService } from '../../services/booking.services';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AIRPORTS } from '../../utils/airports';
import { CustomSnackBarComponent } from '../custom-snack-bar/custom-snack-bar.component';

@Component({
  selector: 'app-reservation-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule, StandardButtonComponent, ReactiveFormsModule, MatSnackBarModule ],
  templateUrl: './reservation-modal.component.html',
  styleUrl: './reservation-modal.component.scss'
})
export class ReservationModalComponent implements OnInit{
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
  @Output() reservationCreated = new EventEmitter<void>();

  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private bookingService = inject(BookingService);

  form!: FormGroup;

  airports = AIRPORTS;
  filteredDepartureAirports = AIRPORTS;
  filteredArrivalAirports = AIRPORTS;

  ngOnInit() {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      birthday: ['', Validators.required],
      document: ['', Validators.required],
      departure_date: ['', Validators.required],
      departure_iata: ['', Validators.required],
      arrival_iata: ['', Validators.required],
      arrival_date: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible'] && changes['visible'].currentValue) {
      // Quando a modal for aberta (visible == true), reseta os dados
      this.reset();
    }
  }

  filterAirports(search: string, type: 'departure' | 'arrival') {
    const filtered = this.airports.filter(airport =>
      airport.code.toLowerCase().includes(search.toLowerCase()) ||
      airport.name.toLowerCase().includes(search.toLowerCase())
    );
    if (type === 'departure') {
      this.filteredDepartureAirports = filtered;
    } else {
      this.filteredArrivalAirports = filtered;
    }
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  
    this.bookingService.createBooking(this.form.value).subscribe({
      next: () => {
        this.snackBar.openFromComponent(CustomSnackBarComponent, {
          data: {
            message: 'Reserva cadastrada com sucesso!',
            type: 'success'
          },
          duration: 6000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        this.reservationCreated.emit();
        this.close.emit();
      },
      error: (err) => {
        console.error('Erro ao cadastrar reserva: ', err)
        this.snackBar.openFromComponent(CustomSnackBarComponent, {
          data: {
            message: 'Erro ao cadastrar reserva. Tente novamente.',
            type: 'error'
          },
          duration: 6000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    });
  }  

  reset() {
    this.form.reset();
    this.filteredDepartureAirports = this.airports;
    this.filteredArrivalAirports = this.airports;
  }
}
