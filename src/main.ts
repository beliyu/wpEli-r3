import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { APP_ROUTER_PROVIDERS  } from './app/app.routes';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent } from './app/app.component';
if (process.env.ENV === 'production') {
  enableProdMode();
}
bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  HTTP_PROVIDERS
]);
