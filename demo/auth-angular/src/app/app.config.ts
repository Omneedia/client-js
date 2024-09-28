import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'
import { createClient, OmneediaClient } from '../../../../dist/module'
import { environment } from '../environments/environment'

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: OmneediaClient,
      useFactory: () => createClient(environment.omneediaUrl, environment.omneediaKey),
    },
  ],
}
