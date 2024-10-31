import { Routes } from '@angular/router';
import { ChallengeDetailComponent } from './challenge/detail/challenge-detail.component';
import { ChallengesListComponent } from './challenge/list/challenges-list.component';
import { ChallengeLevelListComponent } from './challenge-level/list/challenge-level-list.component';
import { ChallengeLevelDetailComponent } from './challenge-level/detail/challenge-level-detail.component';
import { autoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';
import { inject } from '@angular/core';
import { AuthService } from './core/auth.service';
import { StickerListComponent } from './sticker/list/sticker-list.component';
import { StickerDetailComponent } from './sticker/sticker/sticker-detail.component';

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
            path: ':challengeId',
            children: [
              {
                path: 'challenge-levels',
                component: ChallengeLevelListComponent,
              },
              {
                path: 'challenge-levels/create',
                component: ChallengeLevelDetailComponent,
              },
            ],
          },
        ],
      },
      {
        path: 'challenge-levels',
        children: [
          { path: '', component: ChallengeLevelListComponent },
          {
            path: ':challengeLevelId',
            children: [
              {
                path: 'stickers',
                component: StickerListComponent,
              },
              {
                path: 'stickers/create',
                component: StickerDetailComponent,
              },
            ],
          },
        ],
      },
      {
        path: 'stickers',
        children: [{ path: '', component: StickerListComponent }],
      },
      {
        path: 'auth-insights',
        loadComponent: () =>
          import('./auth-insights/auth-insights.component').then((m) => m.AuthInsightsComponent),
      },
    ],
  },
];
