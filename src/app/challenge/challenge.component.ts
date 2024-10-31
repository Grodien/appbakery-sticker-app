import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {generateClient} from "aws-amplify/data";
import {Schema} from "../../../amplify/data/resource";

export type LocalDate = string;
const client = generateClient<Schema>();

@Component({
  selector: 'app-challenge',
  standalone: true,
  imports: [ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './challenge.component.html',
  styleUrl: './challenge.component.scss'
})
export class ChallengeComponent {

  public challengeForm = new FormGroup({
    name: new FormControl<string>('test', {
      nonNullable: true,
      validators: Validators.required,
    }),
    description: new FormControl<string>('test', {
      nonNullable: true,
      validators: Validators.required,
    }),
    scoringA: new FormControl<number>(1, {
      nonNullable: true,
      validators: Validators.required,
    }),
    scoringB: new FormControl<number>(1, {
      nonNullable: true,
      validators: Validators.required,
    }),
    scoringC: new FormControl<number>(1, {
      nonNullable: true,
      validators: Validators.required,
    }),
    scoringD: new FormControl<number>(1, {
      nonNullable: true,
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

  public async createChallenge(): Promise<void> {
    if (this.challengeForm.invalid) {
      return;
    }
    const formValue = this.challengeForm.getRawValue();
      await client.models.ChallengeDto.create({
        name: formValue.name,
        description: formValue.description,
        start_date: new Date(formValue.startDate).toISOString(),
        end_date: new Date(formValue.endDate).toISOString(),
        scoring_a: formValue.scoringA,
        scoring_b: formValue.scoringB,
        scoring_c: formValue.scoringC,
        scoring_d: formValue.scoringD,
        max_count: formValue.maxCount,
        image_uri: formValue.imageUri,
      });
  }

}
