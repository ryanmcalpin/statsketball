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
      if (['new','edit','teams', 'players', 'games'].includes(crumb[index])) {
        resolve(crumb[index]);
      } else if (index === 1 && crumb[0] === 'teams') {
        return this.dbService.getTeamByIdOnce(crumb[index]).then(value => {
          resolve(value.val().name);
        })
      } else if (index === 3 && crumb[2] === 'games') {
        return this.dbService.getGameByIdOnce(crumb[index]).then(value => {
          resolve(value.val().opponent);
        })
      } else if(index === 3 && crumb[2] === 'players'){
        return this.dbService.getPlayerByIdOnce(crumb[index]).then(value =>{
          resolve(value.val().name);
        })
      } else {
        // resolve(crumb[index]);
        console.log("Not making a breacrumb for " + crumb[index]);
      }
    })
  }

}
