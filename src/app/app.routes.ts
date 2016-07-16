import {provideRouter, RouterConfig} from '@angular/router';
import {GroupComponent } from "./group.component";
import {LastComponent } from "./last.component";
import {Rwa} from "./rwa";

export const routes: RouterConfig = [
  {path:'', component:Rwa},
  {path:'group/:id', component:GroupComponent},
  {path:'last/:dat', component:LastComponent}
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];