import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Team } from '../team.model';
import { Player } from '../player.model';
import { Game } from '../game.model';
import { DbService } from '../db.service';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.css']
})
export class TeamViewComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  teamId: string;
  team: Team;
  players: Player[];
  games: Game[];

  newGameModal = new EventEmitter<string|MaterializeAction>();

  constructor(private route: ActivatedRoute,
              private db: DbService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.teamId = params['teamId'];
      this.db.getTeamById(this.teamId)
        .takeUntil(this.ngUnsubscribe).subscribe(team => this.team = team);
      this.db.getPlayersOnTeam(this.teamId)
        .takeUntil(this.ngUnsubscribe).subscribe(players => this.players = players);
      this.db.getGamesPlayedByTeam(this.teamId)
      .takeUntil(this.ngUnsubscribe).subscribe(games => this.games = games);
    })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  openModal() {
    this.newGameModal.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.newGameModal.emit({action:"modal",params:['close']});
  }

}
