import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteResolverService implements Resolve<any> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot): any | Observable<any> | Promise<any> {
    const observable: Observable<any> = new Observable((observer) => {
      const path = route.parent.url[0].path ? route.parent.url[0].path : '';
      observer.next(path);
      observer.complete();
    });

    return observable;
  }
}
