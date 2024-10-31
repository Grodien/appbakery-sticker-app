import {Injectable} from '@angular/core';
import {firstValueFrom, ReplaySubject} from 'rxjs';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {LoginResponse} from 'angular-auth-oidc-client/lib/login/login-response';

interface IdToken {
  name: string;
  email: string;
}

interface AccessToken {
  roles: string[];
  groups: string[];
  tid: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly canActivate = new ReplaySubject<boolean>(1);
  public idToken?: IdToken | null;
  public accessToken?: AccessToken | null;
  public appbakeryAppUser = false;
  public appbakeryAppAdmin = false;

  constructor(private oidcSecurityService: OidcSecurityService) {
    this.init();
  }

  private async init(): Promise<void> {
    const loginResult = await firstValueFrom<LoginResponse>(this.oidcSecurityService.checkAuth());
    if (!loginResult.isAuthenticated) {
      return;
    }
    this.idToken = await firstValueFrom<IdToken>(this.oidcSecurityService.getPayloadFromIdToken());
    this.accessToken = await firstValueFrom<AccessToken>(
      this.oidcSecurityService.getPayloadFromAccessToken(),
    );
    this.initRolesFromJwtRoles();
    this.canActivate.next(this.appbakeryAppUser);
  }

  public async logout(): Promise<void> {
    this.resetRoles();
    this.idToken = null;
    this.accessToken = null;
    await firstValueFrom(this.oidcSecurityService.logoff());
  }

  private initRolesFromJwtRoles(): void {
    const roles = this.accessToken?.roles ? this.accessToken.roles : [];
    this.appbakeryAppUser = this.hasRole('appbakery-app-user', roles);
    this.appbakeryAppAdmin =
      this.appbakeryAppUser || this.hasRole('appbakery-app-admin-user', roles);
  }

  private resetRoles(): void {
    this.appbakeryAppUser = false;
    this.appbakeryAppAdmin = false;
  }

  private hasRole(role: string, roles: string[]): boolean {
    return roles != null && roles.indexOf(role) >= 0;
  }
}
