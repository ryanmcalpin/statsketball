import { Component, OnInit, OnDestroy } from '@angular/core';
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
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.css']
})
export class PlayerViewComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  currentPlayer;
  gamesThisPlayerPlayed;
  teamId: string;
  playerId: string;
  gameStats: any;

  constructor(private route: ActivatedRoute,
              private db: DbService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.teamId = params['teamId'];
      this.playerId = params['playerId'];
      this.db.getPlayerById(this.playerId)
        .takeUntil(this.ngUnsubscribe).subscribe(player => this.currentPlayer = player);
      this.db.getGamesPlayedByPlayer(this.playerId)
        .takeUntil(this.ngUnsubscribe).subscribe(games => this.gamesThisPlayerPlayed = games);
      this.db.getPlayerAllGameStats(this.playerId).takeUntil(this.ngUnsubscribe)
        .subscribe(stats => {
          console.log(stats);
          this.gameStats = stats;
        });
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
