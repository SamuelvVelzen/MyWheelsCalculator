import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideNgIconsConfig, withExceptionLogger } from '@ng-icons/core';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideClientHydration(withEventReplay()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimations(),
    provideNgIconsConfig({}, withExceptionLogger()),
  ],
};
