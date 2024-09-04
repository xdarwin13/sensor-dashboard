import { Component, OnInit, OnDestroy } from '@angular/core';
import { SensorDataService } from '../services/sensor-data.service';
import { interval, Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.component.html'
})
export class HumidityComponent implements OnInit, OnDestroy {
  humidityData: number[] = [];
  chartLabels: string[] = [];
  private humiditySubscription!: Subscription;
  private chart!: Chart<'line', number[]>;

  constructor(private sensorDataService: SensorDataService) {
    Chart.register(...registerables); // Registrar los componentes necesarios de Chart.js
  }

  ngOnInit(): void {
    this.initializeChart();
    this.startHumidityUpdates();
  }

  initializeChart(): void {
    this.chart = new Chart('humidityChart', {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: [
          {
            data: this.humidityData,
            label: 'Humedad',
            fill: true,
            borderColor: '#42A5F5',
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  startHumidityUpdates(): void {
    this.humiditySubscription = interval(3000) // Actualiza cada 5 segundos
      .subscribe(() => this.fetchHumidityData());
  }

  fetchHumidityData(): void {
    this.sensorDataService.getHumidity().subscribe(data => {
      this.humidityData.push(data.humidity);
      this.chartLabels.push(new Date().toLocaleTimeString());
      this.updateChartData();
      console.log("hola", data.humidity);
    });
  }

  updateChartData(): void {
    this.chart.data.labels = this.chartLabels;
    this.chart.data.datasets[0].data = this.humidityData;
    this.chart.update(); // Actualiza el gráfico con los nuevos datos
  }

  ngOnDestroy(): void {
    if (this.humiditySubscription) {
      this.humiditySubscription.unsubscribe();
    }
  }
}
