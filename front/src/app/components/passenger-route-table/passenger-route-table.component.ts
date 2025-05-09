import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { BookingService } from '../../services/booking.services';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-passenger-route-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './passenger-route-table.component.html',
  styleUrls: ['./passenger-route-table.component.scss']
})
export class PassengerRouteTableComponent implements OnInit {
  displayedColumns: string[] = ['date', 'iatapair', 'departures', 'arrivals'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingService.getPassengerTrafficByRoute().subscribe({
      next: (response) => {
        this.dataSource.data = response.data.map((item: { date: string | number | Date; }) => ({
          ...item,
          date: new Date(item.date)
        }));
      },
      error: (err) => {
        console.error('Erro ao carregar dados:', err);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
