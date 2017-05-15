import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Team } from './team.model';
import { Player } from './player.model';

@Injectable()
export class DbService {
  teams: FirebaseListObservable<any>;

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
        birthdate: player.birthdate,
        teamId: teamId
      };
      firebase.database().ref().update(updates);
    })
  }

}
