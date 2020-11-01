import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ContentService } from '@content/services/content.service';

import nbcontent from '@i18n/bokmal.content.json';
import nncontent from '@i18n/nynorsk.content.json';

import nbsystem from '@i18n/bokmal.system.json';
import nnsystem from '@i18n/nynorsk.system.json';

import nbdigitaltestenRaw from '@i18n/bokmal.content.digitaltesten.json';
import nndigitaltestenRaw from '@i18n/nynorsk.content.digitaltesten.json';

import nblesetestenRaw from '@i18n/bokmal.content.lesetesten.json';
import nnlesetestenRaw from '@i18n/nynorsk.content.lesetesten.json';

import nbmuntligtestenRaw from '@i18n/bokmal.content.muntligtesten.json';
import nnmuntligtestenRaw from '@i18n/nynorsk.content.muntligtesten.json';

import nbregnesjekkenRaw from '@i18n/bokmal.content.regnesjekken.json';
import nnregnesjekkenRaw from '@i18n/nynorsk.content.regnesjekken.json';

import nbregnetestenRaw from '@i18n/bokmal.content.regnetesten.json';
import nnleseskrivesjekkenRaw from '@i18n/nynorsk.content.leseskrivesjekken.json';

import nbsamltetestenRaw from '@i18n/bokmal.content.samletesten.json';

import { Lesson } from '@features/questions/interfaces/lesson.interface';

@Injectable()
export class RouteResolverService implements Resolve<any> {
  public path: string;

  constructor(public contentService: ContentService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const nblesetesten: Lesson = nblesetestenRaw as Lesson;
    const nnlesetesten: Lesson = nnlesetestenRaw as Lesson;
    const nbdigitaltesten: Lesson = nbdigitaltestenRaw as Lesson;
    const nndigitaltesten: Lesson = nndigitaltestenRaw as Lesson;
    const nbmuntligtesten: Lesson = nbmuntligtestenRaw as Lesson;
    const nnmuntligtesten: Lesson = nnmuntligtestenRaw as Lesson;
    const nbregnetesten: Lesson = nbregnetestenRaw as Lesson;
    // const nbregnesjekken: Consultation = nbregnesjekkenRaw as Consultation;
    // const nnregnesjekken: Consultation = nnregnesjekkenRaw as Consultation;
    // const nbsamltetesten: Consultation = nbsamltetestenRaw as Consultation;
    // const nnleseskrivesjekken: Consultation = nnleseskrivesjekkenRaw as Consultation;

    // console.log(nblesetesten.modules[0].funnel.type);
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
        // this.contentService.set('nb', { ...nbcontent, ...nbsystem, ...nbregnesjekken });
        // this.contentService.set('nn', { ...nncontent, ...nnsystem, ...nnregnesjekken });
        break;
      case 'samletesten':
        // this.contentService.set('nb', { ...nbcontent, ...nbsystem, ...nbsamltetesten });
        // TODO: missing locale
        break;
      case 'leseskrivesjekken':
        // this.contentService.set('nb', { ...nbcontent, ...nbsystem, ...nnleseskrivesjekken });
        // TODO: missing locale
        break;
      default:
        this.contentService.set('nb', { ...nbcontent, ...nbsystem });
        this.contentService.set('nn', { ...nncontent, ...nnsystem });
        break;
    }

    return route.parent.url[0].path ? route.parent.url[0].path : '';
  }
}
