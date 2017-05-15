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
    this.players = this.db.getPlayers()
  }

}
