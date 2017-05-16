import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Team } from './team.model';
import { Player } from './player.model';

@Injectable()
export class DbService {
  teams: FirebaseListObservable<any>;
  positions: any[] = [
    {short: 'PG', long: 'Point Guard'},
    {short: 'SG', long: 'Shooting Guard'},
    {short: 'SF', long: 'Small Forward'},
    {short: 'PF', long: 'Power Forward'},
    {short: 'C', long: 'Center'}
  ];

  constructor(private db: AngularFireDatabase) {
    this.teams = db.list('/teams');
  }

  createTeam(team: Team, players: Player[]) {
    var teamId = this.teams.push(team).key;
    players.forEach(player => {
      var playerId = firebase.database().ref('/players').push().key;
      var updates = {}
      updates['/teams/'+teamId+'/players/'+playerId] = true;
      updates['/players/'+playerId] = {
        name: player.name,
        position: player.position,
        height: player.height,
        weight: player.weight,
        birthdate: (new Date(player.birthdate).toJSON()),
        teamId: teamId
      };
      firebase.database().ref().update(updates);
    })
  }

  getPositions() {
    return this.positions;
  }

  getTeams(){
    return this.teams;
  }

  getTeamById(teamId: string) {
    return this.db.object('/teams/'+teamId);
  }

  getPlayerById(playerId: string){
    return this.db.object('players/' + playerId);
  }

  getPlayersOnTeam(teamId: string){
    return this.db.list('teams/' + teamId + '/players').switchMap(players=>{
      return players.length===0 ? Observable.of([]) : Observable.combineLatest(...players.map(player => this.getPlayerById(player.$key)))
    });
  }

}
