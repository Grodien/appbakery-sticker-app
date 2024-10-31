import { Routes } from '@angular/router';
import {ChallengeDetailComponent} from "./challenge/detail/challenge-detail.component";
import {ChallengesListComponent} from "./challenge/list/challenges-list.component";

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
    ],
  },
];
