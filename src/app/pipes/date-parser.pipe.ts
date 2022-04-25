import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateParser'
})
export class DateParserPipe implements PipeTransform {

  transform(value: string): string {
    let fecha = new Date (value);
    return fecha.getDate() +"-" + fecha.getMonth() + "-" + fecha.getFullYear();
  }

}
