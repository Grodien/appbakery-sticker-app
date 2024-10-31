import { Routes } from '@angular/router';
import {TodosComponent} from "./todos/todos.component";
import {ChallengeComponent} from "./challenge/challenge.component";

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
    component: ChallengeComponent,
  },
];
