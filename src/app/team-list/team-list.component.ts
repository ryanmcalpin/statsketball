import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service'

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  players;
  constructor(public db: DbService) { }

  ngOnInit() {
    // TODO add argumment
    this.db.getPlayersOnTeam().subscribe(results=>{
      this.players = results;
    });
  }

}
