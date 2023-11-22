import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { provideStore } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(), 
    provideRouter(appRoutes), 
    provideAnimations(), 
    provideHttpClient(withFetch()),
    provideStore(),
    provideStoreDevtools({ logOnly: false })
  ]
};
