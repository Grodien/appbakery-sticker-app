import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthInsightsComponent } from './auth-insights.component';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { of } from 'rxjs';

const authServiceMock: Partial<OidcSecurityService> = {
  getUserData: () => of({ name: 'Test', email: 'test@sbb.chh', roles: [] }),
  getAuthenticationResult: () => of({ scope: 'openid' }),
};

describe('AuthInsightsComponent', () => {
  let component: AuthInsightsComponent;
  let fixture: ComponentFixture<AuthInsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthInsightsComponent],
      providers: [{ provide: OidcSecurityService, useValue: authServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
