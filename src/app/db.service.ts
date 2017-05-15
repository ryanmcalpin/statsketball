import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class DbService {

  constructor() { }

  getTeams(){
    return this.teams;
  }

  getPlayerById(playerId: string){
    return this.db.object('players/' + playerId);
  }

  getPlayersOnTeam(teamId: string){
    return this.db.list('teams/' + teamId + '/players').switchMap(players=>{
      return players.length===0 ? Observable.of([]) : Observable.combineLatest(...players.map(player =>{this.getPlayerById(player.$key)}))
    });
  }

}
