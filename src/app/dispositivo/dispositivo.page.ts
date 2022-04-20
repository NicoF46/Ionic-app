import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../model/dispositivo';
import { Medicion } from '../model/medicion';
import { DispositivoService } from '../services/dispositivo.service';
import { MedicionService } from '../services/medicion.service';

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage implements OnInit {
  public dispositivo:Dispositivo;
  public ultimaMedicion:Medicion;
  public mediciones:Medicion[];

  constructor(private router:ActivatedRoute, private dServ:DispositivoService, private mServ:MedicionService) { }

  ngOnInit() {
    let idDispositivo = this.router.snapshot.paramMap.get('id');
    this.dispositivo = this.dServ.getDispositivo(idDispositivo);
    this.mServ.getMedicionByIdDispositivo(idDispositivo).then((med)=>{
      this.ultimaMedicion=med;
    });
    this.mServ.getMedicionesByIdDispositivo(idDispositivo).then((med)=>{
      console.log(med);
      this.mediciones=med;
    });
  }

  ionViewWillEnter(){
  }

}
