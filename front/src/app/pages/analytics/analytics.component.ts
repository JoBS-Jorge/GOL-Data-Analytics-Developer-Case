
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BarChartComponent } from '../../components/bar-chart/bar-chart.component';
import { BookingService } from '../../services/booking.services';
import { Observable } from 'rxjs/internal/Observable';
import { PassengerRouteTableComponent } from '../../components/passenger-route-table/passenger-route-table.component';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [RouterModule, BarChartComponent, PassengerRouteTableComponent],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  chartDataDepartures: { category: string; value: number }[] = [];
  chartDataArrivals: { category: string; value: number }[] = [];
  chartDataByRoute: { category: string; value: number }[] = [];

  constructor(private BookingService: BookingService) {}

  ngOnInit() {
    this.fetchChartData();
  }

  fetchChartData(): void {
    this.loadChartData(
      this.BookingService.getPassengerDeparturesByDate(),
      (data) => this.chartDataDepartures = data
    );
  
    this.loadChartData(
      this.BookingService.getPassengerArrivalsByDate(),
      (data) => this.chartDataArrivals = data
    );

    this.loadChartData(
      this.BookingService.getPassengerByRoute(),
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
