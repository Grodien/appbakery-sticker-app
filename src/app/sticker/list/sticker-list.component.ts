import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../../../../amplify/data/resource';

const client = generateClient<Schema>();

@Component({
  selector: 'app-sticker-list',
  standalone: true,
  imports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './sticker-list.component.html',
  styleUrl: './sticker-list.component.scss',
})
export class StickerListComponent implements OnInit {
  public stickers: any[] = [];

  constructor(private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    const challengeLevelId = this.route.snapshot.paramMap.get('challengeLevelId');
    if (challengeLevelId != null) {
      this.stickers = (
        await firstValueFrom(
          client.models.StickerDto.observeQuery({
            filter: {
              level_id: {
                eq: challengeLevelId,
              },
            },
          }),
        )
      ).items;
    } else {
      this.stickers = (await firstValueFrom(client.models.StickerDto.observeQuery())).items;
    }
  }
}
