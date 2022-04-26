import { Component, Input, OnInit } from '@angular/core';
import { Riego } from 'src/app/model/riego';
import { RiegoService } from 'src/app/services/riego.service';

@Component({
  selector: 'app-log-riego',
  templateUrl: './log-riego.component.html',
  styleUrls: ['./log-riego.component.scss'],
})
export class LogRiegoComponent implements OnInit {
  @Input() valvulaId:string;
  public riegos: Riego[];

  constructor(private rServ: RiegoService) { }

  ngOnInit() {
    this.rServ.getLogsRiegoByIdValvula(this.valvulaId).then((riegos) => {
      this.riegos = riegos;
    });
  }


}
