import { Component, OnInit, OnDestroy } from '@angular/core';
import { DbService } from '../db.service'
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { Team } from '../team.model';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  adminLoggedIn: boolean = true; // TODO change this

  teams: any[];
  players: any[];
  constructor(public db: DbService) { }

  ngOnInit() {
    this.db.getTeams()
      .takeUntil(this.ngUnsubscribe).subscribe(teams => {
        this.teams = teams;
        this.db.getPlayersOnTeam(teams[0].$key)
          .takeUntil(this.ngUnsubscribe).subscribe(results=>{
            this.players = results;
          });
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
