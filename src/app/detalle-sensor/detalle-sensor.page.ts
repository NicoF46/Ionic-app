//correr antes npm install --save highcharts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';
import { Dispositivo } from '../model/dispositivo';
import { Medicion } from '../model/medicion';
import { Riego } from '../model/riego';
import { DispositivoService } from '../services/dispositivo.service';
import { MedicionService } from '../services/medicion.service';
import { RiegoService } from '../services/riego.service';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'app-detalle-sensor',
  templateUrl: './detalle-sensor.page.html',
  styleUrls: ['./detalle-sensor.page.scss'],
})
export class DetalleSensorPage implements OnInit {

  private valorObtenido: number = 0;
  public myChart;
  private chartOptions;
  public ultimaMedicion: Medicion;
  public mediciones: Medicion[];
  public riegos: Riego[];
  public dispositivo: Dispositivo;
  public mostrarRiegos: boolean = false;
  public mostrarMediciones: boolean = false;
  public accionBotonValvula: string;

  constructor(private router: ActivatedRoute, private mServ: MedicionService, private dServ: DispositivoService, private rServ: RiegoService) {
    let idDispositivo = this.router.snapshot.paramMap.get('id');
    this.dispositivo = this.dServ.getDispositivo(idDispositivo);
  }

  ngOnInit() {
    this.mServ.getMedicionesByIdDispositivo(this.dispositivo.dispositivoId).then((med) => {
      this.mediciones = med;
    });
    this.rServ.getLogsRiegoByIdValvula(this.dispositivo.electrovalvulaId).then((riegos) => {
      this.riegos = riegos;
      this.actualizarBotonAccionValvula();
    });
    this.mServ.getMedicionByIdDispositivo(this.dispositivo.dispositivoId).then((med) => {
      this.ultimaMedicion = med;
    }).then(() => {
      this.actualizarChart()
    }
    )
  }

  ionViewDidEnter() {
    this.generarChart();
  }

  generarChart() {
    this.chartOptions = {
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
      }
      , title: {
        text: 'Sensor N° 1'
      }

      , credits: { enabled: false }


      , pane: {
        startAngle: -150,
        endAngle: 150
      }
      // the value axis
      , yAxis: {
        min: 0,
        max: 100,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
          step: 2,
          rotation: 'auto'
        },
        title: {
          text: 'kPA'
        },
        plotBands: [{
          from: 0,
          to: 10,
          color: '#55BF3B' // green
        }, {
          from: 10,
          to: 30,
          color: '#DDDF0D' // yellow
        }, {
          from: 30,
          to: 100,
          color: '#DF5353' // red
        }]
      }
      ,

      series: [{
        name: 'kPA',
        data: [this.valorObtenido],
        tooltip: {
          valueSuffix: ' kPA'
        }
      }]

    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions);
  }

  actualizarChart(){
    this.valorObtenido = Number(this.ultimaMedicion.valor);
    this.myChart.update({
      series: [{
        name: 'kPA',
        data: [this.valorObtenido],
        tooltip: {
          valueSuffix: ' kPA'
        }
      }]
    });
  }

  actualizarBotonAccionValvula(){
    console.log(this.riegos[0].apertura);
    if(this.riegos[0].apertura == 0)
      this.accionBotonValvula = "Abrir electrovalvula";
    else
      this.accionBotonValvula = "Cerrar electrovalvula";
  }

  cambiarVisibilidadRiego() {
    this.mostrarRiegos = !this.mostrarRiegos;
  }

  cambiarVisibilidadMediciones() {
    this.mostrarMediciones = !this.mostrarMediciones;
  }

  async accionarValvula() {
    let aperturaValvula: Number = 0;
    if (this.accionBotonValvula == "Abrir electrovalvula"){
      aperturaValvula = 100;
    }
    console.log(aperturaValvula);
    await this.rServ.generarAperturaValvulaById(this.dispositivo.electrovalvulaId, aperturaValvula);
    await this.mServ.agregarMedicion(new Medicion(1, moment().format(),Math.floor((Math.random()*90)+10),this.dispositivo.dispositivoId  ))
    await this.actualizarListadoRiegos();
    this.actualizarBotonAccionValvula();
    this.ultimaMedicion = await this.mServ.getMedicionByIdDispositivo(this.dispositivo.dispositivoId);
    this.actualizarChart();
    this.actualizarListadoMediciones();
  }

  async actualizarListadoRiegos() {
    this.riegos = await this.rServ.getLogsRiegoByIdValvula(this.dispositivo.electrovalvulaId);
  }

  async actualizarListadoMediciones() {
    this.mediciones = await this.mServ.getMedicionesByIdDispositivo(this.dispositivo.dispositivoId)
  }
}