import { Injectable } from '@angular/core';
import { Dispositivo } from '../model/dispositivo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {
  listado:Array<Dispositivo> = new Array<Dispositivo>();
  listado2:Array<Dispositivo> = new Array<Dispositivo>();
  urlApi="http://localhost:3000";

  constructor(private _http: HttpClient) {
    this.getDispositivos();
   }

   async getDispositivos(){
    let listado= await this.getListadoDispositivos();
    this.listado=listado;
  }

  getListadoDispositivos():Promise<Dispositivo[]>{
    return this._http.get<[]>(this.urlApi+ "/api/dispositivo/").toPromise().then((res)=>{
      return res.map(disp => {
        return Dispositivo.DispositivoDesdeJson(disp);
      })
    });
  }

   getDispositivo(id):Dispositivo{
    return this.listado.filter(dispositivo=> dispositivo.dispositivoId==id)[0];
 }
}