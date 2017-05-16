import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewTeamComponent } from './new-team/new-team.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamViewComponent } from './team-view/team-view.component';
import { UpdateStatsComponent } from './update-stats/update-stats.component';

const appRoutes: Routes = [
  {
    path: '',
    component: TeamListComponent
  },
  {
    path: 'teams',
    component: TeamListComponent
  },
  {
    path: 'teams/new',
    component: NewTeamComponent
  },
  {
    path: 'teams/:teamId',
    component: TeamViewComponent
  },
  {
    path: 'teams/:teamId/games/:gameId/stats',
    component: UpdateStatsComponent
  }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
