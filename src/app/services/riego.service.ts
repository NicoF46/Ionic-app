import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Riego } from '../model/riego';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RiegoService {
  urlApi = "http://localhost:3000";


  constructor(private _http: HttpClient) { }

  getLogsRiegoByIdValvula(id): Promise<Riego[]> {
    return this._http.get<[]>(this.urlApi + "/api/riego/" + id + "/todas").toPromise().then((meds) => {
      return meds.map(med => {
        return Riego.RiegoDesdeJson(med);
      })
    });
  };

  generarAperturaValvulaById(id) {
    return this._http.post(this.urlApi + "/api/riego/agregar", {fecha: moment().format(), apertura: 100, electrovalvulaid: id}).toPromise().then((result)=>{
      return result;
    });
  }
}
