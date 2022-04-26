import { Component, OnInit, Input } from '@angular/core';
import { Medicion } from 'src/app/model/medicion';
import { MedicionService } from 'src/app/services/medicion.service';

@Component({
  selector: 'app-log-mediciones',
  templateUrl: './log-mediciones.component.html',
  styleUrls: ['./log-mediciones.component.scss'],
})
export class LogMedicionesComponent implements OnInit {
  @Input() dispositivoId:string;
  public mediciones: Medicion[];


  constructor(private mServ: MedicionService) { }

  ngOnInit() {
    this.mServ.getMedicionesByIdDispositivo(this.dispositivoId).then((med) => {
      this.mediciones = med;
    });
  }

}
