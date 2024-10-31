import { Routes } from '@angular/router';
import { ChallengeDetailComponent } from './challenge/detail/challenge-detail.component';
import { ChallengesListComponent } from './challenge/list/challenges-list.component';
import { ChallengeLevelListComponent } from './challenge-level/list/challenge-level-list.component';
import { ChallengeLevelDetailComponent } from './challenge-level/detail/challenge-level-detail.component';
import { autoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';
import { inject } from '@angular/core';
import { AuthService } from './core/auth.service';

export const routes: Routes = [
  {
    path: '',
    canActivate: [autoLoginPartialRoutesGuard, () => inject(AuthService).canActivate],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'challenges' },
      {
        path: 'challenges',
        children: [
          { path: '', component: ChallengesListComponent },
          { path: 'create', component: ChallengeDetailComponent },
          {
            path: ':challengeId/challenge-levels',
            component: ChallengeLevelListComponent,
          },
          {
            path: ':challengeId/challenge-levels/create',
            component: ChallengeLevelDetailComponent,
          },
        ],
      },
      {
        path: 'challenge-levels',
        children: [
          { path: '', component: ChallengeLevelListComponent },
          { path: 'create', component: ChallengeLevelDetailComponent },
        ],
      },
      {
        path: 'auth-insights',
        loadComponent: () =>
          import('./auth-insights/auth-insights.component').then((m) => m.AuthInsightsComponent),
      },
    ],
  },
];
