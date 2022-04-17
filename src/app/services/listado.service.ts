import { Injectable } from '@angular/core';
import { Dispositivo } from '../model/dispositivo';

@Injectable({
  providedIn: 'root'
})
export class ListadoService {
  listadoDispositivos:Array<Dispositivo> = new Array<Dispositivo>();
  
  constructor() {
    var disp:Dispositivo= new Dispositivo(1,"Sensor 1","Patio",1);
    var disp2:Dispositivo= new Dispositivo(2,"Sensor 2","Cocina",2);
    var disp3:Dispositivo= new Dispositivo(3,"Sensor 3","Jardin Delantero",3);
    var disp4:Dispositivo= new Dispositivo(4,"Sensor 4","Living",4);
    this.listadoDispositivos.push(disp);
    this.listadoDispositivos.push(disp2);
    this.listadoDispositivos.push(disp3);
    this.listadoDispositivos.push(disp4);
   }

  getDispositivos(){
    return this.listadoDispositivos;
  }
}
