import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogRiegoComponent } from './log-riego/log-riego.component';
import { LogMedicionesComponent } from './log-mediciones/log-mediciones.component';
import { DateParserPipe } from '../pipes/date-parser.pipe';



@NgModule({
  declarations: [LogRiegoComponent, LogMedicionesComponent, DateParserPipe],
  exports: [LogRiegoComponent, LogMedicionesComponent, DateParserPipe],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
