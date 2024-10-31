import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {DatePipe} from "@angular/common";
import {RouterLink, RouterModule} from "@angular/router";
import {toSignal} from "@angular/core/rxjs-interop";
import {generateClient} from "aws-amplify/api";
import {Schema} from "../../../../amplify/data/resource";

const client = generateClient<Schema>();

@Component({
  selector: 'app-challenge-level-list',
  standalone: true,
    imports: [
        RouterModule
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './challenge-level-list.component.html',
  styleUrl: './challenge-level-list.component.scss'
})
export class ChallengeLevelListComponent {
  public challengeLevels = toSignal(client.models.LevelDto.observeQuery())
}
