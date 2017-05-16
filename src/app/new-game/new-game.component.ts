import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { DbService } from '../db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {
  @Input() teamId: string;
  @Output() closeModalSender = new EventEmitter();

  newGameForm: FormGroup;

  constructor(private fb: FormBuilder,
              private db: DbService,
              private router: Router) { }

  ngOnInit() {
    this.newGameForm = this.fb.group({
      opponent: ['', Validators.required],
      season: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  createGame() {
    var {opponent, season, location, date} = this.newGameForm.value;
    var newGame = {
      opponent: opponent,
      season: season,
      location: location,
      date: date,
      teamId: this.teamId
    }
    var gameId = this.db.createGame(newGame);
    this.closeModalSender.emit();
    this.router.navigate(['teams', this.teamId, 'games', gameId, 'stats']);
  }
}
