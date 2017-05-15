import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewTeamComponent } from './new-team/new-team.component';

const appRoutes: Routes = [
  {
    path: '',
    component: NewTeamComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
