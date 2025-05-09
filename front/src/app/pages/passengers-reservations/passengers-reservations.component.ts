import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.services';
import { ReservationModalComponent } from "../../components/reservation-modal/reservation-modal.component";
import { StandardButtonComponent } from "../../components/standard-button/standard-button.component";
import { DynamicTableComponent } from '../../components/dynamic-table/dynamic-table.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomSnackBarComponent } from '../../components/custom-snack-bar/custom-snack-bar.component';

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  type?: 'date' | 'custom' | 'dates' | 'route';
}
@Component({
  selector: 'app-passengers-reservations',
  imports: [
    RouterModule,
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    ReservationModalComponent,
    StandardButtonComponent,
    MatSortModule,
    DynamicTableComponent,
    MatSnackBarModule,
  ],
  standalone: true,
  templateUrl: './passengers-reservations.component.html',
  styleUrl: './passengers-reservations.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class PassengersReservationsComponent implements OnInit {
  displayedColumns: string[] = ['first_name', 'last_name', 'document', 'birthday', 'route', 'dates', 'actions'];

  columns: Column[] = [
    { key: 'first_name', label: 'Nome', sortable: true, type: 'custom' },
    { key: 'last_name', label: 'Sobrenome', sortable: true, type: 'custom' },
    { key: 'document', label: 'Documento', sortable: true, type: 'custom' },
    { key: 'birthday', label: 'Nascimento', sortable: false, type: 'date' },
    { key: 'route', label: 'Rota (IATA)', sortable: false, type: 'route' },
    { key: 'dates', label: 'Datas', sortable: false, type: 'dates' }
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>([]);
  showModal: boolean = false;

  constructor(private bookingService: BookingService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.dataSource.filterPredicate = (data, filter: string) => {
      const nomeCompleto = `${data.first_name} ${data.last_name}`.toLowerCase();
      const documento = data.document?.toLowerCase() || '';
      return nomeCompleto.includes(filter) || documento.includes(filter);
    };
  }

  fetchBookings() {
    this.bookingService.getBookings().subscribe({
      next: (res) => {
        this.dataSource.data = Array.isArray(res) ? res : res.data || [];
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Erro ao buscar reservas:', err);
        this.dataSource.data = [];
      }
    });
  }

  uploadReservations(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.bookingService.uploadBookingsfile(file).subscribe({
        next: (res) => {
          if (!res || typeof res.rows !== 'number') {
            this.snackBar.openFromComponent(CustomSnackBarComponent, {
              data: {
                message: 'Erro ao importar o arquivo.',
                type: 'error'
              },
              duration: 6000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
            return;
          }
  
          this.snackBar.openFromComponent(CustomSnackBarComponent, {
            data: {
              message: `Importado ${res.rows} registro(s) com sucesso.`,
              type: 'success'
            },
            duration: 6000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.fetchBookings();
        },
        error: (err) => {
          console.error('Erro ao importar arquivo:', err);
          this.snackBar.openFromComponent(CustomSnackBarComponent, {
            data: {
              message: 'Erro ao importar o arquivo.',
              type: 'error'
            },
            duration: 6000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      });
  
      // limpar o input para permitir reenvio do mesmo arquivo
      input.value = '';
    }
  }
  
  
  
  onDownloadClick(): void {
    this.bookingService.downloadReservationsFile();
  }

  // Método para abrir a modal
  openReservationModal(): void {
    this.showModal = true;
  }

  // Método para fechar a modal
  closeReservationModal(): void {
    this.showModal = false;
  }

  // Métodos dos Actions buttons
  onEdit() {
    console.log('não implmentado')
  }
  onDelete() {
    console.log('não implmentado')
  }
}
