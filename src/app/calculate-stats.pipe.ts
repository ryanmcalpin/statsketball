import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateStats'
})
export class CalculateStatsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
