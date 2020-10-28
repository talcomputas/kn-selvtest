import { Route } from '@angular/router';

export type RouteData = {
  name: string;
};

export type AppRoute = Route & {
  data?: RouteData;
};
