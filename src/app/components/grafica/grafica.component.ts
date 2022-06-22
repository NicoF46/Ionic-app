import { AfterViewInit, Component, ElementRef, ViewChild, OnInit, Input, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import { Medicion } from 'src/app/model/medicion';
import { MedicionService } from 'src/app/services/medicion.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.scss'],
})
export class GraficaComponent implements AfterViewInit {
  // Importing ViewChild. We need @ViewChild decorator to get a reference to the local variable 
  // that we have added to the canvas element in the HTML template.
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  @Input() dispositivoId: string;
  private mediciones: Medicion[];
  lineChart: any;
  private values: any;
  private timeValues: any;
  private intervalId: any;

  constructor(private mServ: MedicionService) {
   }

  // When we try to call our chart to initialize methods in ngOnInit() it shows an error nativeElement of undefined. 
  // So, we need to call all chart methods in ngAfterViewInit() where @ViewChild and @ViewChildren will be resolved.
  ngAfterViewInit() {
    this.lineChartMethod();
    this.updateChart();
    this.intervalId = setInterval(() => {
      this.updateChart(); 
    }, 30000);
  }

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Mediciones dispositivo',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [],
            spanGaps: false,
          }
        ]},
        options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  }

  updateChart() {
    this.mServ.getMedicionesByIdDispositivo(this.dispositivoId).then((med) => {
      this.mediciones = med;
      this.values = this.mediciones.map(a => a.valor).reverse();
      this.timeValues = this.mediciones.map(a => a.fecha).reverse();
      this.lineChart.data.labels = this.mediciones.map(a => a.fecha).reverse();;
      this.lineChart.data.datasets.forEach((dataset) => {
        dataset.data = this.mediciones.map(a => a.valor).reverse();
        this.lineChart.update();
      });
    })
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}