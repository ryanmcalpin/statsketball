import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import { Team } from '../team.model';
import { Player } from '../player.model';
import { DbService } from '../db.service';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service'


@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.css']
})
export class NewTeamComponent implements OnInit {

  newTeamForm: FormGroup;
  positions: any[];
  currentUserId: any;

  constructor(private fb: FormBuilder,
              private db: DbService,
              private router: Router,
              private authService: AuthenticateService) { }

  ngOnInit() {
    this.newTeamForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      players: this.fb.array([]),
      coachName: ['', Validators.required]
    });
    this.positions = this.db.getPositions();
    this.authService.getCurrentUser().subscribe(results=>{
      this.currentUserId = results.uid;
    });

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
      jerseyNumber: [''],
      imageURL: ['']
    }))
  }

  removePlayer(index: number) {
    this.players.removeAt(index);
  }

  createTeam() {
    var {name, location, players, coachName} = this.newTeamForm.value;
    var newTeam = new Team(name, location, coachName);
    var teamId = this.db.createTeam(newTeam, players, this.currentUserId);
    this.newTeamForm.reset();
    this.router.navigate(['teams', teamId]);
  }

}
