import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../../../../amplify/data/resource';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

const client = generateClient<Schema>();

@Component({
  selector: 'app-challenges-list',
  standalone: true,
  imports: [RouterModule, DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './challenges-list.component.html',
  styleUrl: './challenges-list.component.scss',
})
export class ChallengesListComponent {
  public challenges = toSignal(client.models.ChallengeDto.observeQuery());
}
