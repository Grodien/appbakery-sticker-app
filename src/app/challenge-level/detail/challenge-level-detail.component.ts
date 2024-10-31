import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../../../../amplify/data/resource';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

const client = generateClient<Schema>();

@Component({
  selector: 'app-challenge-level-detail',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './challenge-level-detail.component.html',
  styleUrl: './challenge-level-detail.component.scss',
})
export class ChallengeLevelDetailComponent implements OnInit {
  public challengeLevelForm = new FormGroup({
    threshold: new FormControl<number>(1, {
      nonNullable: true,
      validators: Validators.required,
    }),
    bonusScore: new FormControl<number>(1, {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  private challengeId?: string | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  async ngOnInit(): Promise<void> {
    this.challengeId = this.route.snapshot.paramMap.get('challengeId');
    console.log(this.challengeId);
  }

  public async createChallengeLevel(): Promise<void> {
    if (this.challengeLevelForm.invalid || this.challengeId == null) {
      return;
    }
    const formValue = this.challengeLevelForm.getRawValue();
    await client.models.LevelDto.create({
      challenge_id: this.challengeId,
      threshold: formValue.threshold,
      bonus_score: formValue.bonusScore,
    });
    await this.router.navigate([`/challenge-levels`]);
  }
}
