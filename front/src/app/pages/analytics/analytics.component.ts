
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BarChartComponent } from '../../components/bar-chart/bar-chart.component';
import { BookingService } from '../../services/booking.services';
import { Observable } from 'rxjs/internal/Observable';
import { PassengerRouteTableComponent } from '../../components/passenger-route-table/passenger-route-table.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    RouterModule,
    BarChartComponent,
    PassengerRouteTableComponent,
  ],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  chartDataDepartures: { category: string; value: number }[] = [];
  chartDataArrivals: { category: string; value: number }[] = [];
  chartDataByRoute: { category: string; value: number }[] = [];  

  displayedColumns: string[] = ['date', 'iatapair', 'departures', 'arrivals'];
  dataSource = new MatTableDataSource<any>([]);

  columns: { key: string, label: string, sortable: boolean }[] = [
    { key: 'date', label: 'Data', sortable: true },
    { key: 'iatapair', label: 'Rota (IATA)', sortable: true },
    { key: 'departures', label: 'Partidas', sortable: true },
    { key: 'arrivals', label: 'Chegadas', sortable: false },
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.fetchChartData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchChartData(): void {
    this.loadChartData(
      this.bookingService.getPassengerDeparturesByDate(),
      (data) => this.chartDataDepartures = data
    );
  
    this.loadChartData(
      this.bookingService.getPassengerArrivalsByDate(),
      (data) => this.chartDataArrivals = data
    );

    this.loadChartData(
      this.bookingService.getPassengerByRoute(),
      (data) => this.chartDataByRoute = data
    );
  }

  private loadChartData(
    observable$: Observable<any>,
    assignCallback: (data: { category: string; value: number }[]) => void
  ): void {
    observable$.subscribe({
      next: (response) => {
        const chartData = response.data.map((item: any) => ({
          category: item.category,
          value: item.value
        }));
        assignCallback(chartData);
      },
      error: (err) => {
        console.error('Erro ao carregar dados do gráfico:', err);
      }
    });
  }  
}
