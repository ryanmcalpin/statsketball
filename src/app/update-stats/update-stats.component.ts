import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Team } from '../team.model';
import { Player } from '../player.model';
import { Game } from '../game.model';
import { DbService } from '../db.service';
import { AuthenticateService } from '../authenticate.service';

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
  user: any = null;
  userAssociatedWithTeam: any = null;


  constructor(private route: ActivatedRoute,
              private db: DbService,
              private authService: AuthenticateService,
              private router: Router) { }

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
      this.authService.getCurrentUser()
      .takeUntil(this.ngUnsubscribe).subscribe(userInfo => {
        this.user = userInfo});
      this.db.getUserIdAssociatedWithTeam(this.teamId)
      .takeUntil(this.ngUnsubscribe).subscribe(userId =>{
          this.db.getUserById(Object.keys(userId)[0]).takeUntil(this.ngUnsubscribe).subscribe(userInfo => this.userAssociatedWithTeam = userInfo);
      });
    })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  trackByFn(index: any, item: any) {
    return item.$key;
  }

  deleteGame() {
    if(confirm("Are you sure you want to delete the game?")){
      this.db.deleteGame(this.gameId);
      this.router.navigate(['teams', this.teamId]);
    }
  }
}
