import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ContentService } from '@content/services/content.service';
import { Observable } from 'rxjs';
import nbdigitaltesten from '@i18n/bokmal.content.digitaltesten.json';
import nbcontent from '@i18n/bokmal.content.json';
import nblesetesten from '@i18n/bokmal.content.lesetesten.json';
import nbmuntligtesten from '@i18n/bokmal.content.muntligtesten.json';
import nbregnesjekken from '@i18n/bokmal.content.regnesjekken.json';
import nbregnetesten from '@i18n/bokmal.content.regnetesten.json';
import nbsystem from '@i18n/bokmal.system.json';

import nndigitaltesten from '@i18n/nynorsk.content.digitaltesten.json';
import nncontent from '@i18n/nynorsk.content.json';
import nnleseskrivesjekken from '@i18n/nynorsk.content.leseskrivesjekken.json';
import nnlesetesten from '@i18n/nynorsk.content.lesetesten.json';
import nnmuntligtesten from '@i18n/nynorsk.content.muntligtesten.json';
import nnregnesjekken from '@i18n/nynorsk.content.regnesjekken.json';
import nnsystem from '@i18n/nynorsk.system.json';

@Injectable()
export class RouteResolverService implements Resolve<any> {
  public path: string;

  constructor(public contentService: ContentService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    this.path = route.parent.url[0].path ? route.parent.url[0].path : '';

    switch (this.path) {
      case 'lesetesten':
        this.contentService.set('nb', { ...nbcontent, ...nbsystem, ...nblesetesten });
        this.contentService.set('nn', { ...nncontent, ...nnsystem, ...nnlesetesten });
        break;
      case 'digitaltesten':
        this.contentService.set('nb', { ...nbcontent, ...nbsystem, ...nbdigitaltesten });
        this.contentService.set('nn', { ...nncontent, ...nnsystem, ...nndigitaltesten });
        break;
      case 'muntligtesten':
        this.contentService.set('nb', { ...nbcontent, ...nbsystem, ...nbmuntligtesten });
        this.contentService.set('nn', { ...nncontent, ...nnsystem, ...nnmuntligtesten });
        break;
      case 'regnetesten':
        this.contentService.set('nb', { ...nbcontent, ...nbsystem, ...nbregnetesten });
        // TODO: missing locale
        break;
      case 'regnesjekken':
        this.contentService.set('nb', { ...nbcontent, ...nbsystem, ...nbregnesjekken });
        this.contentService.set('nn', { ...nncontent, ...nnsystem, ...nnregnesjekken });
        break;
      default:
        this.contentService.set('nb', { ...nbcontent, ...nbsystem });
        this.contentService.set('nn', { ...nncontent, ...nnsystem });
        break;
    }

    return route.parent.url[0].path ? route.parent.url[0].path : '';
  }
}