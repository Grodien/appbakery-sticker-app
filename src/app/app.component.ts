import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

import '@sbb-esta/lyne-elements/button.js';
import '@sbb-esta/lyne-elements/header.js';
import '@sbb-esta/lyne-elements/menu.js';
import '@sbb-esta/lyne-elements/navigation.js';
import '@sbb-esta/lyne-elements/tag.js';
import '@sbb-esta/lyne-elements/status.js';
import '@sbb-esta/lyne-elements/container.js';
import '@sbb-esta/lyne-elements/title.js';
import '@sbb-esta/lyne-elements/form-field.js';
import '@sbb-esta/lyne-elements/notification.js';
import '@sbb-esta/lyne-elements/loading-indicator.js';
import '@sbb-esta/lyne-elements/form-error.js';
import '@sbb-esta/lyne-elements/toast.js';
import '@sbb-esta/lyne-elements/datepicker.js';
import '@sbb-esta/lyne-elements/accordion.js';
import '@sbb-esta/lyne-elements/select.js';
import '@sbb-esta/lyne-elements/option.js';
import '@sbb-esta/lyne-elements/dialog.js';

Amplify.configure(outputs);

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {}
