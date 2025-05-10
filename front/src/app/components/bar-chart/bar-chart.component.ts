import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnChanges {
  @Input() chartData: { category: string, value: number }[] = [];
  @Input() title: string = 'Gráfico de Colunas';
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: '',
        backgroundColor: '#fe5e00',
        hoverBackgroundColor: '#C43E00',
      }
    ]
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: '' }
    },
    scales: {
      x: {},
      y: { beginAtZero: true }
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData'] && this.chartData?.length) {
      this.updateChart();
    }

    if (changes['title']) {
      this.barChartOptions.plugins!.title!.text = this.title;
      this.barChartData.datasets[0].label = this.title;
    }
  }

  private updateChart(): void {
    this.barChartData.labels = this.chartData.map(item => item.category);
    this.barChartData.datasets[0].data = this.chartData.map(item => item.value);

    this.chart?.update();
  }
}
