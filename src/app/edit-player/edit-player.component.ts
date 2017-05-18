import { Component, OnInit, Input } from '@angular/core';
import { DbService } from '../db.service';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import { MaterializeAction } from 'angular2-materialize';
import { Player } from '../player.model';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit {
  @Input() player;
  @Input() playerId;
  editPlayerForm: FormGroup;
  positions: any[];

  constructor(private db: DbService,
              private fb: FormBuilder) { }

  ngOnInit() {
    console.log(this.player);
    this.editPlayerForm = this.fb.group({
      name: [this.player.name, Validators.required],
      position: [this.player.position, Validators.required],
      height: [this.player.height, Validators.required],
      weight: [this.player.weight, Validators.required],
      birthdate: [this.player.birthdate, Validators.required],
      jerseyNumber: [this.player.jerseyNumber, Validators.required]
    });
    this.positions = this.db.getPositions();
  }

  clickFinish() {
    var {name, position, height, weight, birthdate, jerseyNumber} = this.editPlayerForm.value;
    var editedPlayer = new Player(name, position, jerseyNumber, height, weight, birthdate);
    this.db.updatePlayer(this.playerId, editedPlayer);
  }

}
