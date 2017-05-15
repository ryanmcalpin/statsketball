import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import { Team } from '../team.model';
import { Player } from '../player.model';
import { DbService } from '../db.service';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.css']
})
export class NewTeamComponent implements OnInit {

  newTeamForm: FormGroup;

  constructor(private fb: FormBuilder,
              private db: DbService) { }

  ngOnInit() {
    this.newTeamForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      players: this.fb.array([]),
      coachName: ['', Validators.required]
    })
  }

  get players(): FormArray {
    return this.newTeamForm.get('players') as FormArray;
  }

  addPlayer() {
    this.players.push(this.fb.group({
      name: [''],
      position: [''],
      height: [''],
      weight: [''],
      birthdate: [''],
      jerseyNumber: ['']
    }))
  }

  removePlayer(index: number) {
    this.players.removeAt(index);
  }

  createTeam() {
    var {name, location, players, coachName} = this.newTeamForm.value;
    var newTeam = new Team(name, location, coachName);
    this.db.createTeam(newTeam, players);
    this.newTeamForm.reset();
  }

}
