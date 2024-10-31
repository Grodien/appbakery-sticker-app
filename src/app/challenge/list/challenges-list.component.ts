import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, Signal, signal} from '@angular/core';
import {generateClient} from "aws-amplify/api";
import {Schema} from "../../../../amplify/data/resource";
import {toSignal} from "@angular/core/rxjs-interop";
import {RouterModule} from "@angular/router";

const client = generateClient<Schema>();

@Component({
  selector: 'app-challenges-list',
  standalone: true,
  imports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './challenges-list.component.html',
  styleUrl: './challenges-list.component.scss'
})
export class ChallengesListComponent implements OnInit{

  public challenges = toSignal(client.models.ChallengeDto.observeQuery())

  constructor(
  ) {
    console.log(client.models)
  }

  ngOnInit(): void {
    }

}
