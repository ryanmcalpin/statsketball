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

  createGame(team: any, game: any) {
    var gameId = firebase.database().ref('/games').push().key;
    var updates = {};
    updates['/games/'+gameId] = game;
    updates['/teams/'+game.teamId+'/games/'+gameId] = true;
    Object.keys(team.players).forEach(player => {
      updates['/singleGamePlayerStats/'+gameId+'/'+player] = {
        minutes: 0,
        twoMade: 0,
        twoAttempt: 0,
        threeMade: 0,
        threeAttempt: 0,
        freeMade: 0,
        freeAttempt: 0,
        offRebounds: 0,
        defRebounds: 0,
        assists: 0,
        turnovers: 0,
        steals: 0,
        blocks: 0,
        fouls: 0
      }
    })
    firebase.database().ref().update(updates);
    return gameId;
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

  getGameById(gameId: string) {
    return this.db.object('/games/'+gameId);
  }

  getGameByIdOnce(gameId: string) {
    return firebase.database().ref('/games/'+ gameId).once('value');
  }

  getPlayerByIdOnce(playerId: string) {
    return firebase.database().ref('/players/'+ playerId).once('value');
  }

  getTeamByIdOnce(teamId: string) {
    return firebase.database().ref('/teams/'+teamId).once('value');
  }

  getPlayerById(playerId: string){
    return this.db.object('/players/' + playerId);
  }

  getPlayerGameStats(gameId: string, playerId: string) {
    return this.db.object('/singleGamePlayerStats/'+gameId+'/'+playerId);
  }

  getPlayersOnTeam(teamId: string){
    return this.db.list('teams/' + teamId + '/players').switchMap(players=>{
      return players.length===0 ? Observable.of([]) : Observable.combineLatest(...players.map(player => this.getPlayerById(player.$key)))
    });
  }

}
