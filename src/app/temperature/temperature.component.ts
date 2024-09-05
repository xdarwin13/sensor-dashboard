import { Component, OnInit, OnDestroy } from '@angular/core';
import { SensorDataService } from '../services/sensor-data.service';
import { interval, Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { MessageService } from 'primeng/api'; // Importar el servicio de mensajes

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  providers: [MessageService] // Agregar MessageService como proveedor
})
export class TemperatureComponent implements OnInit, OnDestroy {
  temperatureData: number[] = [];
  chartLabels: string[] = [];
  private temperatureSubscription!: Subscription;
  private chart!: Chart<'line', number[]>;
  private lastTemperature: number | null = null;

  constructor(
    private sensorDataService: SensorDataService,
    private messageService: MessageService // Inyectar MessageService
  ) {
    Chart.register(...registerables);
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
    this.temperatureSubscription = interval(3000)
      .subscribe(() => this.fetchTemperatureData());
  }

  fetchTemperatureData(): void {
    this.sensorDataService.getTemperature().subscribe(data => {
      if (this.lastTemperature === null || data.temperature !== this.lastTemperature) {
        this.lastTemperature = data.temperature;
        this.temperatureData.push(data.temperature);
        this.chartLabels.push(new Date().toLocaleTimeString());
        this.updateChartData();
        console.log("Temperatura actualizada:", data.temperature);

        // Verificar si la temperatura alcanza los 50 grados para enviar una notificación de riesgo
        
      }
      if (data.temperature >= 32) {
        this.sendRiskNotification();
      }
    });
  }

  sendRiskNotification(): void {
    this.messageService.add({
      key: 'customToast', // Clave para usar la plantilla personalizada
      summary: '⚠️ Advertencia de Temperatura',
      detail: '¡La temperatura ha alcanzado los 50 grados o más!',
      life: 5000, // Duración de la notificación en milisegundos
      styleClass: 'custom-toast', // Clase de estilo personalizada
    });
  }

  updateChartData(): void {
    this.chart.data.labels = this.chartLabels;
    this.chart.data.datasets[0].data = this.temperatureData;
    this.chart.update();
  }

  ngOnDestroy(): void {
    if (this.temperatureSubscription) {
      this.temperatureSubscription.unsubscribe();
    }
  }
}
