import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seasonFilter'
})
export class SeasonFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
