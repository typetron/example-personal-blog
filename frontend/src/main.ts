import 'reflect-metadata'
import '@Typetron/Support/Array'
import '@Typetron/Support/String'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/app.module'

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err))
