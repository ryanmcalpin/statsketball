import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.css']
})
export class NewTeamComponent implements OnInit {

  newTeamForm: FormGroup;

  constructor(private fb: FormBuilder) { }

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
    console.log(this.newTeamForm);
    console.log(this.newTeamForm.value);
  }

}
