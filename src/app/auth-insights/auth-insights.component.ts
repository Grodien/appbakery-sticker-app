import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from '../core/auth.service';

@Component({
  selector: 'app-auth-insights',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './auth-insights.component.html',
  styleUrls: ['./auth-insights.component.scss'],
})
export class AuthInsightsComponent {
  constructor(public authService: AuthService) {}
}
