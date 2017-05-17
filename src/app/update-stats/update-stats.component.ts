import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Team } from '../team.model';
import { Player } from '../player.model';
import { Game } from '../game.model';
import { DbService } from '../db.service';

@Component({
  selector: 'app-update-stats',
  templateUrl: './update-stats.component.html',
  styleUrls: ['./update-stats.component.css']
})
export class UpdateStatsComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  teamId: string;
  gameId: string;
  team: any;
  game: any;
  players: any[];
  gameSummary: any;


  constructor(private route: ActivatedRoute,
              private db: DbService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.teamId = params['teamId'];
      this.gameId = params['gameId'];
      this.db.getTeamById(this.teamId)
        .takeUntil(this.ngUnsubscribe).subscribe(team => {
          this.team = team;
          this.players = Object.keys(this.team.players).map(key => {
            var player = {};
            player['info'] = this.db.getPlayerById(key);
            player['stats'] = this.db.getPlayerGameStats(this.gameId, key);
            return player;
          });
        });
      this.db.getGameById(this.gameId)
        .takeUntil(this.ngUnsubscribe).subscribe(game => this.game = game);
      this.gameSummary = this.db.getGameStats(this.gameId);
    })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  trackByFn(index: any, item: any) {
    return item.$key;
  }


}
