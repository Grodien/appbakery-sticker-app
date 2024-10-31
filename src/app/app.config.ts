import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { authInterceptor, OidcSecurityService, provideAuth } from 'angular-auth-oidc-client';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';

function appInitializerAuthCheck() {
  return {
    provide: APP_INITIALIZER,
    useFactory: (oidcSecurityService: OidcSecurityService) => () =>
      oidcSecurityService.checkAuthMultiple(),
    multi: true,

    deps: [OidcSecurityService],
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAuth({
      config: {
        configId: 'app',
        authority: 'https://login.microsoftonline.com/2cda5d11-f0ac-46b3-967d-af1b2e1bd01a/v2.0',
        redirectUrl: window.location.origin,
        clientId: '3cad168f-c0d7-41b0-be1c-6f91498cfce9',
        scope: 'openid profile email offline_access 3cad168f-c0d7-41b0-be1c-6f91498cfce9/.default',
        silentRenew: true,
        useRefreshToken: true,
        autoUserInfo: false,
        maxIdTokenIatOffsetAllowedInSeconds: 600,
      },
    }),
    appInitializerAuthCheck(),
    provideHttpClient(withInterceptorsFromDi(), withInterceptors([authInterceptor()])),
  ],
};
