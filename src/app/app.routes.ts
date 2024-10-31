import { Routes } from '@angular/router';
import {ChallengeDetailComponent} from "./challenge/detail/challenge-detail.component";
import {ChallengesListComponent} from "./challenge/list/challenges-list.component";
import {ChallengeLevelListComponent} from "./challenge-level/list/challenge-level-list.component";
import {
  ChallengeLevelDetailComponent
} from "./challenge-level/detail/challenge-level-detail.component";

export const routes: Routes = [
  {
    path: '',
    component: ChallengesListComponent,
  },
  {
    path: 'challenges',
    children: [
      { path: '', component: ChallengesListComponent },
      { path: 'create', component: ChallengeDetailComponent },
      { path: ':challengeId/challenge-levels/create', component: ChallengeLevelDetailComponent },
    ],
  },
  {
    path: 'challenge-levels',
    children: [
      { path: '', component: ChallengeLevelListComponent },
      { path: 'create', component: ChallengeLevelDetailComponent },
    ],
  },
];
