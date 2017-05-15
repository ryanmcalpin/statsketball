import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { NewTeamComponent } from './new-team/new-team.component';
import { NewPlayerComponent } from './new-player/new-player.component';
import { EditPlayerComponent } from './edit-player/edit-player.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { NewGameComponent } from './new-game/new-game.component';
import { EditGameComponent } from './edit-game/edit-game.component';
import { TeamViewComponent } from './team-view/team-view.component';
import { PlayerViewComponent } from './player-view/player-view.component';
import { GameViewComponent } from './game-view/game-view.component';
import { UpdateStatsComponent } from './update-stats/update-stats.component';
import { CalculateStatsPipe } from './calculate-stats.pipe';
import { SeasonFilterPipe } from './season-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NewTeamComponent,
    NewPlayerComponent,
    EditPlayerComponent,
    EditTeamComponent,
    NewGameComponent,
    EditGameComponent,
    TeamViewComponent,
    PlayerViewComponent,
    GameViewComponent,
    UpdateStatsComponent,
    CalculateStatsPipe,
    SeasonFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
