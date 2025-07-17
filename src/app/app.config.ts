import { NG_EVENT_PLUGINS, provideEventPlugins } from '@taiga-ui/event-plugins';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE } from '@taiga-ui/i18n';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiRequestInterceptor } from './interceptors/api-request.interceptor';
import { of } from 'rxjs';
import { apiResponseInterceptor } from './interceptors/api-response.interceptor';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    {
      provide: TUI_LANGUAGE,
      useValue: of(TUI_RUSSIAN_LANGUAGE),
    },
    provideHttpClient(
      withInterceptors([
        apiRequestInterceptor, 
        apiResponseInterceptor,
        tokenInterceptor
      ]),
    ),
    provideRouter(routes),
    NG_EVENT_PLUGINS,
    provideEventPlugins(),
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
    ]
};
