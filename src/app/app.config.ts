import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'ng-cinerama-18',
        appId: '1:891794302026:web:2745a8bf4ba7201b2272b3',
        storageBucket: 'ng-cinerama-18.appspot.com',
        apiKey: 'AIzaSyDtmxTzo1_yasKPEn6NxEikLbOkXeiTe8I',
        authDomain: 'ng-cinerama-18.firebaseapp.com',
        messagingSenderId: '891794302026',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],

};
