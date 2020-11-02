import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

@Injectable()
export class RouteResolverService implements Resolve<any> {
  public path: string;

  constructor() {}
  resolve(route: ActivatedRouteSnapshot): any {
    return route.parent.url[0].path ? route.parent.url[0].path : '';
  }
}
