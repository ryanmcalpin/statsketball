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
import { AuthenticateService } from '../authenticate.service';


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
  editing: boolean = false;
  gameStats: any;
  user: any = null;
  userAssociatedWithTeam: any = null;

  constructor(private route: ActivatedRoute,
              private db: DbService,
              private authService: AuthenticateService) { }

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
          this.gameStats = stats;
        });
      this.authService.getCurrentUser()
      .takeUntil(this.ngUnsubscribe).subscribe(userInfo => {
        this.user = userInfo});
      this.db.getUserIdAssociatedWithTeam(this.teamId)
      .takeUntil(this.ngUnsubscribe).subscribe(userId =>{
          this.db.getUserById(Object.keys(userId)[0]).takeUntil(this.ngUnsubscribe).subscribe(userInfo => this.userAssociatedWithTeam = userInfo);
      });
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  clickEdit() {
    if (this.editing) {
      this.editing = false;
    } else {
      this.editing = true;
    }
  }

  finishEdit() {
    this.editing = false;
  }

  deletePlayer() {
    this.db.deletePlayer(this.playerId);
  }
}
