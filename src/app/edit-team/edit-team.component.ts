import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import { DbService } from '../db.service';
import { Team } from '../team.model';


@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {
  @Input() teamId: string;
  @Input() team;
  @Output() finishSender = new EventEmitter();
  editTeamForm: FormGroup;

  constructor(private fb: FormBuilder,
              private db: DbService) { }

  ngOnInit() {
    this.editTeamForm = this.fb.group({
      name: [this.team.name, Validators.required],
      location: [this.team.location, Validators.required],
      coachName: [this.team.coachName, Validators.required]
    });
  }

  finishEdit() {
    var {name, location, coachName} = this.editTeamForm.value;
    var editedTeam = new Team(name, location, coachName);
    this.db.updateTeam(this.teamId, editedTeam);
    this.editTeamForm.reset();
    this.finishSender.emit();
  }

}
