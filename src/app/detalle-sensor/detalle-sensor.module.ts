import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DetalleSensorPageRoutingModule } from './detalle-sensor-routing.module';
import { DetalleSensorPage } from './detalle-sensor.page';
import { DateParserPipe } from '../pipes/date-parser.pipe';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleSensorPageRoutingModule,
    ComponentsModule
  ],
  exports: [DateParserPipe],
  declarations: [DetalleSensorPage, DateParserPipe]
})
export class DetalleSensorPageModule {}
