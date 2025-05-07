import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.services';
import { ReservationModalComponent } from "../../components/reservation-modal/reservation-modal.component";
import { StandardButtonComponent } from "../../components/standard-button/standard-button.component";
import { ReservationsSearchComponent } from '../../components/reservations-search/reservations-search.component';

@Component({
  selector: 'app-passengers-reservations',
  imports: [RouterModule, CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule, ReservationModalComponent, StandardButtonComponent,ReservationsSearchComponent],
  standalone: true,
  templateUrl: './passengers-reservations.component.html',
  styleUrl: './passengers-reservations.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PassengersReservationsComponent implements OnInit {
  displayedColumns: string[] = ['first_name', 'last_name', 'document', 'birthday', 'route', 'dates', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<any>([]);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.dataSource.filterPredicate = (data, filter: string) => {
      const nomeCompleto = `${data.first_name} ${data.last_name}`.toLowerCase();
      const documento = data.document?.toLowerCase() || '';
      return nomeCompleto.includes(filter) || documento.includes(filter);
    };
  }

  showModal: boolean = false;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings() {
    this.bookingService.getBookings().subscribe({
      next: (res) => {
        this.dataSource.data = Array.isArray(res) ? res : res.data || [];
      },
      error: (err) => {
        console.error('Erro ao buscar reservas:', err);
        this.dataSource.data = [];
      }
    });
  }

  onDownloadClick(): void {
    this.bookingService.downloadReservationsFile();
  }

  //Método para filtrar usando a searchbar
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Método para abrir a modal
  openReservationModal(): void {
    this.showModal = true;
  }

  // Método para fechar a modal
  closeReservationModal(): void {
    this.showModal = false;
  }
}
