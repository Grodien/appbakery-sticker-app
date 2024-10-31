import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../../../../amplify/data/resource';
import { firstValueFrom } from 'rxjs';

const client = generateClient<Schema>();

@Component({
  selector: 'app-challenge-level-list',
  standalone: true,
  imports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './challenge-level-list.component.html',
  styleUrl: './challenge-level-list.component.scss',
})
export class ChallengeLevelListComponent implements OnInit {
  public challengeLevels: any[] = [];

  constructor(private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    const challengeId = this.route.snapshot.paramMap.get('challengeId');
    if (challengeId != null) {
      this.challengeLevels = (
        await firstValueFrom(
          client.models.LevelDto.observeQuery({
            filter: {
              challenge_id: {
                eq: challengeId,
              },
            },
          }),
        )
      ).items;
    } else {
      this.challengeLevels = (await firstValueFrom(client.models.LevelDto.observeQuery())).items;
    }
  }
}
