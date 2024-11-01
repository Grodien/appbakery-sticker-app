import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { generateClient } from 'aws-amplify/data';
import { Schema } from '../../../../amplify/data/resource';
import { Router, RouterModule } from '@angular/router';

export type LocalDate = string;
const client = generateClient<Schema>();

interface ChallengeType {
  name: string;
  scoringA: number;
  scoringB: number;
  scoringC: number;
  scoringD: number;
}

@Component({
  selector: 'app-challenge-detail',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './challenge-detail.component.html',
  styleUrl: './challenge-detail.component.scss',
})
export class ChallengeDetailComponent {
  public challengeTypes: ChallengeType[] = [
    {
      name: 'Keine Punkte Challenge',
      scoringA: 0,
      scoringB: 2,
      scoringC: 0,
      scoringD: 0,
    },
    {
      name: 'Konstante Punkte Challenge',
      scoringA: 0,
      scoringB: 2,
      scoringC: 0,
      scoringD: 2,
    },
    {
      name: 'Normale Punkte Challenge',
      scoringA: 0.7,
      scoringB: 0.6,
      scoringC: -0.4,
      scoringD: 9,
    },
    {
      name: 'Double XP Challenge',
      scoringA: 1,
      scoringB: 0.6,
      scoringC: -0.4,
      scoringD: 18,
    },
    {
      name: 'Hard Challenge',
      scoringA: 1,
      scoringB: 0.1,
      scoringC: -0.4,
      scoringD: 20,
    },
  ];
  public challengeForm = new FormGroup({
    name: new FormControl<string>('test', {
      nonNullable: true,
      validators: Validators.required,
    }),
    description: new FormControl<string>('test', {
      nonNullable: true,
      validators: Validators.required,
    }),
    challengeType: new FormControl<string>(this.challengeTypes[4].name, {
      validators: Validators.required,
    }),
    maxCount: new FormControl<number>(5, {
      validators: Validators.required,
    }),
    imageUri: new FormControl<string>('todo', {
      nonNullable: true,
      validators: Validators.required,
    }),
    startDate: new FormControl<LocalDate | Date>(new Date().toISOString().substring(0, 10), {
      nonNullable: true,
      validators: Validators.required,
    }),
    endDate: new FormControl<LocalDate | Date>(new Date().toISOString().substring(0, 10), {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  constructor(private router: Router) {}

  public async createChallenge(): Promise<void> {
    if (this.challengeForm.invalid) {
      return;
    }
    const formValue = this.challengeForm.getRawValue();
    if (formValue.challengeType == null) {
      return;
    }
    const challengeType = this.challengeTypes.find((c) => c.name === formValue.challengeType);
    if (challengeType == null) {
      return;
    }
    await client.models.ChallengeDto.create({
      name: formValue.name,
      description: formValue.description,
      start_date: new Date(formValue.startDate).toISOString(),
      end_date: new Date(formValue.endDate).toISOString(),
      scoring_a: challengeType.scoringA,
      scoring_b: challengeType.scoringB,
      scoring_c: challengeType.scoringC,
      scoring_d: challengeType.scoringD,
      max_count: formValue.maxCount,
      image_uri: formValue.imageUri,
    });
    await this.router.navigate([`/challenges`]);
  }
}
