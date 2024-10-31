import { Routes } from '@angular/router';
import {TodosComponent} from "./todos/todos.component";
import {ChallengeDetailComponent} from "./challenge/detail/challenge-detail.component";
import {ChallengesListComponent} from "./challenge/list/challenges-list.component";

export const routes: Routes = [
  {
    path: '',
    component: TodosComponent,
  },
  {
    path: 'todos',
    component: TodosComponent,
  },
  {
    path: 'challenges',
    children: [
      { path: '', component: ChallengesListComponent },
      { path: 'create', component: ChallengeDetailComponent },
    ],
  },
];
