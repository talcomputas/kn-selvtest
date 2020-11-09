import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ContentService } from '@content/services/content.service';

import nbcontent from '@i18n/bokmal.content.json';
import nncontent from '@i18n/nynorsk.content.json';
import encontent from '@i18n/engelsk.content.json';

import nbsystem from '@i18n/bokmal.system.json';
import nnsystem from '@i18n/nynorsk.system.json';
import ensystem from '@i18n/engelsk.system.json';

import nblesetestenRaw from '@i18n/bokmal.content.lesetesten.json';
import nnlesetestenRaw from '@i18n/nynorsk.content.lesetesten.json';
import enlesetestenRaw from '@i18n/engelsk.content.lesetesten.json';

import nbregnetestenRaw from '@i18n/bokmal.content.regnetesten.json';
import nnregnetestenRaw from '@i18n/nynorsk.content.regnetesten.json';

import nbdigitaltestenRaw from '@i18n/bokmal.content.digitaltesten.json';
import nndigitaltestenRaw from '@i18n/nynorsk.content.digitaltesten.json';

import nbmuntligtestenRaw from '@i18n/bokmal.content.muntligtesten.json';
import nnmuntligtestenRaw from '@i18n/nynorsk.content.muntligtesten.json';

import nbleseskrivesjekkenRaw from '@i18n/bokmal.content.leseskrivesjekken.json';
import nnleseskrivesjekkenRaw from '@i18n/nynorsk.content.leseskrivesjekken.json';
import enleseskrivesjekkenRaw from '@i18n/engelsk.content.leseskrivesjekken.json';

import nbregnesjekkenRaw from '@i18n/bokmal.content.regnesjekken.json';
import nnregnesjekkenRaw from '@i18n/nynorsk.content.regnesjekken.json';
import enregnesjekkenRaw from '@i18n/engelsk.content.regnesjekken.json';

import nbdatasjekkenRaw from '@i18n/bokmal.content.datasjekk.json';
import nndatasjekkenRaw from '@i18n/nynorsk.content.datasjekk.json';
import endatasjekkenRaw from '@i18n/engelsk.content.datasjekk.json';

import nbmuntligsjekkenRaw from '@i18n/bokmal.content.muntligsjekken.json';
import nnmuntligsjekkenRaw from '@i18n/nynorsk.content.muntligsjekken.json';
import enmuntligsjekkenRaw from '@i18n/engelsk.content.muntligsjekken.json';

import nbsamltetestenRaw from '@i18n/bokmal.content.samletesten.json';

import { Lesson } from '@features/questions/interfaces/lesson.interface';

@Injectable()
export class RouteResolverService implements Resolve<any> {
  public path: string;

  constructor(public contentService: ContentService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    this.path = route && route.parent && route.parent.url[0].path ? route.parent.url[0].path : '';

    const nblesetesten: Lesson = nblesetestenRaw as Lesson;
    const nnlesetesten: Lesson = nnlesetestenRaw as Lesson;
    const enlesetesten: Lesson = enlesetestenRaw as Lesson;

    const nbregnetesten: Lesson = nbregnetestenRaw as Lesson;
    const nnregnetesten: Lesson = nnregnetestenRaw as Lesson;

    const nbdigitaltesten: Lesson = nbdigitaltestenRaw as Lesson;
    const nndigitaltesten: Lesson = nndigitaltestenRaw as Lesson;

    const nbmuntligtesten: Lesson = nbmuntligtestenRaw as Lesson;
    const nnmuntligtesten: Lesson = nnmuntligtestenRaw as Lesson;

    const nbleseskrivesjekken: Lesson = nbleseskrivesjekkenRaw as Lesson;
    const nnleseskrivesjekken: Lesson = nnleseskrivesjekkenRaw as Lesson;
    const enleseskrivesjekken: Lesson = enleseskrivesjekkenRaw as Lesson;

    const nbregnesjekken: Lesson = nbregnesjekkenRaw as Lesson;
    const nnregnesjekken: Lesson = nnregnesjekkenRaw as Lesson;
    const enregnesjekken: Lesson = enregnesjekkenRaw as Lesson;

    const nbdatasjekken: Lesson = nbdatasjekkenRaw as Lesson;
    const nndatasjekken: Lesson = nndatasjekkenRaw as Lesson;
    const endatasjekken: Lesson = endatasjekkenRaw as Lesson;

    const nbmuntligsjekken: Lesson = nbmuntligsjekkenRaw as Lesson;
    const nnmuntligsjekken: Lesson = nnmuntligsjekkenRaw as Lesson;
    const enmuntligsjekken: Lesson = enmuntligsjekkenRaw as Lesson;

    const nbsamltetesten: Lesson = nbsamltetestenRaw as Lesson;

    switch (this.path) {
      case 'lesetesten':
        this.contentService.set('nb', { ...nbcontent, ...nbsystem, ...nblesetesten });
        this.contentService.set('nn', { ...nncontent, ...nnsystem, ...nnlesetesten });
        this.contentService.set('en', { ...encontent, ...ensystem, ...enlesetesten });
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
        this.contentService.set('nn', { ...nncontent, ...nnsystem, ...nnregnetesten });
        break;
      case 'leseskrivesjekken':
        this.contentService.set('nb', { ...nbcontent, ...nbsystem, ...nbleseskrivesjekken });
        this.contentService.set('nn', { ...nncontent, ...nnsystem, ...nnleseskrivesjekken });
        this.contentService.set('en', { ...encontent, ...ensystem, ...enleseskrivesjekken });

        break;
      case 'regnesjekken':
        this.contentService.set('nb', { ...nbcontent, ...nbsystem, ...nbregnesjekken });
        this.contentService.set('nn', { ...nncontent, ...nnsystem, ...nnregnesjekken });
        this.contentService.set('en', { ...encontent, ...ensystem, ...enregnesjekken });
        break;
      case 'datasjekken':
        this.contentService.set('nb', { ...nbcontent, ...nbsystem, ...nbdatasjekken });
        this.contentService.set('nn', { ...nncontent, ...nnsystem, ...nndatasjekken });
        this.contentService.set('en', { ...encontent, ...ensystem, ...endatasjekken });
        break;
      case 'muntligsjekken':
        this.contentService.set('nb', { ...nbcontent, ...nbsystem, ...nbmuntligsjekken });
        this.contentService.set('nn', { ...nncontent, ...nnsystem, ...nnmuntligsjekken });
        this.contentService.set('en', { ...encontent, ...ensystem, ...enmuntligsjekken });
        break;

      case 'samletesten':
        this.contentService.set('nb', { ...nbcontent, ...nbsystem, ...nbsamltetesten });
        break;

      default:
        this.contentService.set('nb', { ...nbcontent, ...nbsystem });
        this.contentService.set('nn', { ...nncontent, ...nnsystem });
        this.contentService.set('en', { ...encontent, ...ensystem });
        break;
    }

    return this.path;
  }
}
