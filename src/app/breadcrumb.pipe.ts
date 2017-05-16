import { Pipe, PipeTransform } from '@angular/core';
import { DbService } from './db.service';

@Pipe({
  name: 'breadcrumb',
  pure: true
})
export class BreadcrumbPipe implements PipeTransform {

  constructor(private dbService: DbService) {}

  transform(crumb: string[], index: number): any {
    return new Promise((resolve, reject) => {
      if (crumb[index] === 'new') {
        resolve(crumb[index]);
      } else if (index === 1 && crumb[0] === 'members') {
        return this.dbService.getMemberOnce(crumb[index]).then(value => {
          if (value.val().displayName) {
            resolve(value.val().displayName);
          } else {
            resolve(value.val().email);
          }
        })
      } else if (index === 1 && crumb[0] === 'events') {
        return this.dbService.getEventOnce(crumb[index]).then(value => {
          resolve(value.val().name);
        })
      } else {
        resolve(crumb[index]);
      }
    })
  }

}
