import { Component, OnInit, OnDestroy } from '@angular/core';
import { SensorDataService } from '../services/sensor-data.service';
import { interval, Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html'
})
export class TemperatureComponent implements OnInit, OnDestroy {
  temperatureData: number[] = [];
  chartLabels: string[] = [];
  private temperatureSubscription!: Subscription;
  private chart!: Chart<'line', number[]>;

  constructor(private sensorDataService: SensorDataService) {
    Chart.register(...registerables); // Registrar los componentes necesarios de Chart.js
  }

  ngOnInit(): void {
    this.initializeChart();
    this.startTemperatureUpdates();
  }

  initializeChart(): void {
    this.chart = new Chart('temperatureChart', {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: [
          {
            data: this.temperatureData,
            label: 'Temperatura',
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

  startTemperatureUpdates(): void {
    this.temperatureSubscription = interval(3000) // Actualiza cada 5 segundos
      .subscribe(() => this.fetchTemperatureData());
  }

  fetchTemperatureData(): void {
    this.sensorDataService.getTemperature().subscribe(data => {
      this.temperatureData.push(data.temperature);
      this.chartLabels.push(new Date().toLocaleTimeString());
      this.updateChartData();
      console.log("hola", data.temperature);
    });
  }

  updateChartData(): void {
    this.chart.data.labels = this.chartLabels;
    this.chart.data.datasets[0].data = this.temperatureData;
    this.chart.update(); // Actualiza el gráfico con los nuevos datos
  }

  ngOnDestroy(): void {
    if (this.temperatureSubscription) {
      this.temperatureSubscription.unsubscribe();
    }
  }
}
