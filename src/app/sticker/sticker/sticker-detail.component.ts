import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../../../../amplify/data/resource';

const client = generateClient<Schema>();

@Component({
  selector: 'app-sticker-detail',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './sticker-detail.component.html',
  styleUrl: './sticker-detail.component.scss',
})
export class StickerDetailComponent implements OnInit {
  public stickerForm = new FormGroup({
    name: new FormControl<string>('todo', {
      nonNullable: true,
      validators: Validators.required,
    }),
    description: new FormControl<string>('meine beschreibung', {
      nonNullable: true,
      validators: Validators.required,
    }),
    imageUri: new FormControl<string>('todo', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  private challengeLevelId?: string | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  async ngOnInit(): Promise<void> {
    this.challengeLevelId = this.route.snapshot.paramMap.get('challengeLevelId');
  }

  public async createChallengeLevel(): Promise<void> {
    if (this.stickerForm.invalid || this.challengeLevelId == null) {
      return;
    }
    const formValue = this.stickerForm.getRawValue();
    await client.models.StickerDto.create({
      level_id: this.challengeLevelId,
      name: formValue.name,
      description: formValue.description,
      img_uri: formValue.imageUri,
    });
    await this.router.navigate([`/stickers`]);
  }
}
