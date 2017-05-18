import { Component, OnInit, Input } from '@angular/core';
import { DbService } from '../db.service';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
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
    this.editPlayerForm = this.fb.group({
      name: [this.player.name, Validators.required],
      position: [this.player.position, Validators.required],
      height: [this.player.height, Validators.required],
      weight: [this.player.weight, Validators.required],
      birthdate: [this.player.birthdate, Validators.required],
      jerseyNumber: [this.player.jerseyNumber, Validators.required],
      imageURL: [this.player.imageURL, [Validators.required, this.forbiddenNameValidator(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi)]]
    });
    this.positions = this.db.getPositions();
  }

  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
      return (control: AbstractControl): {[key: string]: any} => {
      const name = control.value;
      const no = nameRe.test(name);
      return no ? {'forbiddenName': {name}} : null;
    };
  }

  clickFinish() {
    var {name, position, height, weight, birthdate, jerseyNumber, imageURL} = this.editPlayerForm.value;
    var editedPlayer = new Player(name, position, jerseyNumber, height, weight, birthdate, imageURL);
    this.db.updatePlayer(this.playerId, editedPlayer);
  }

  isValidURL(query: string){
    // isValidURL(editPlayerForm.value.imageURL) in button
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    console.log(regex.test(query));
    return regex.test(query);
  }

}
