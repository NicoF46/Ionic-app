import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogRiegoComponent } from './log-riego/log-riego.component';
import { LogMedicionesComponent } from './log-mediciones/log-mediciones.component';
import { DateParserPipe } from '../pipes/date-parser.pipe';
import { GraficaComponent } from './grafica/grafica.component';



@NgModule({
  declarations: [LogRiegoComponent, LogMedicionesComponent, GraficaComponent, DateParserPipe],
  exports: [LogRiegoComponent, LogMedicionesComponent, GraficaComponent, DateParserPipe],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
