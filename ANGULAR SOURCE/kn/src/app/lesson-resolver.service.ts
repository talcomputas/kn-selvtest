import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ContentService } from '@content/services/content.service';

import nbcontent from '@i18n/bokmal.content.json';
import nncontent from '@i18n/nynorsk.content.json';
import encontent from '@i18n/engelsk.content.json';

import nbsystem from '@i18n/bokmal.system.json';
import nnsystem from '@i18n/nynorsk.system.json';
import ensystem from '@i18n/engelsk.system.json';

import nbdigitaltesten from '@i18n/bokmal.content.digitaltesten.json';
import nndigitaltesten from '@i18n/nynorsk.content.digitaltesten.json';

import nblesetesten from '@i18n/bokmal.content.lesetesten.json';
import nnlesetesten from '@i18n/nynorsk.content.lesetesten.json';

import nbmuntligtesten from '@i18n/bokmal.content.muntligtesten.json';
import nnmuntligtesten from '@i18n/nynorsk.content.muntligtesten.json';

import nbregnetesten from '@i18n/bokmal.content.regnetesten.json';
import nnregnetesten from '@i18n/nynorsk.content.regnetesten.json';

import nbregnesjekken from '@i18n/bokmal.content.regnesjekken.json';
import nnregnesjekken from '@i18n/nynorsk.content.regnesjekken.json';

import nbleseskrivesjekken from '@i18n/bokmal.content.leseskrivesjekken.json';
import nnleseskrivesjekken from '@i18n/nynorsk.content.leseskrivesjekken.json';
import enleseskrivesjekken from '@i18n/engelsk.content.leseskrivesjekken.json';

import nbmuntligsjekken from '@i18n/bokmal.content.muntligsjekken.json';
import nnmuntligsjekken from '@i18n/nynorsk.content.muntligsjekken.json';
import enmuntligsjekken from '@i18n/engelsk.content.muntligsjekken.json';

import nbdatasjekken from '@i18n/bokmal.content.datasjekk.json';
import nndatasjekken from '@i18n/nynorsk.content.datasjekk.json';
import endatasjekken from '@i18n/engelsk.content.datasjekk.json';

import nbsamletesten from '@i18n/bokmal.content.samletesten.json';
import { throwError } from 'rxjs';

@Injectable()
export class LessonResolverService implements Resolve<string> {
  public path: string;

  constructor(public contentService: ContentService) {}

  resolve(route: ActivatedRouteSnapshot): string {
    this.path = route.url && route.url[0] && route.url[0].path ? route.url[0].path : '';

    this.configureContentService(this.path, this.contentService);

    return this.path;
  }

  private configureContentService(path: string, contentService: ContentService) {
    contentService.unset('en');
    switch (path) {
      case 'lesetesten':
        contentService.set('nb', { ...nbcontent, ...nbsystem, ...nblesetesten });
        contentService.set('nn', { ...nncontent, ...nnsystem, ...nnlesetesten });
        break;
      case 'digitaltesten':
        contentService.set('nb', { ...nbcontent, ...nbsystem, ...nbdigitaltesten });
        contentService.set('nn', { ...nncontent, ...nnsystem, ...nndigitaltesten });
        break;
      case 'muntligtesten':
        contentService.set('nb', { ...nbcontent, ...nbsystem, ...nbmuntligtesten });
        contentService.set('nn', { ...nncontent, ...nnsystem, ...nnmuntligtesten });
        break;
      case 'regnetesten':
        contentService.set('nb', { ...nbcontent, ...nbsystem, ...nbregnetesten });
        contentService.set('nn', { ...nbcontent, ...nbsystem, ...nnregnetesten });
        break;
      case 'regnesjekken':
        contentService.set('nb', { ...nbcontent, ...nbsystem, ...nbregnesjekken });
        contentService.set('nn', { ...nncontent, ...nnsystem, ...nnregnesjekken });
        break;
      case 'leseskrivesjekken':
        contentService.set('nb', { ...nbcontent, ...nbsystem, ...nbleseskrivesjekken });
        contentService.set('nn', { ...nncontent, ...nnsystem, ...nnleseskrivesjekken });
        contentService.set('en', { ...encontent, ...ensystem, ...enleseskrivesjekken });
        break;
      case 'datasjekken':
        contentService.set('nb', { ...nbcontent, ...nbsystem, ...nbdatasjekken });
        contentService.set('nn', { ...nncontent, ...nnsystem, ...nndatasjekken });
        contentService.set('en', { ...encontent, ...ensystem, ...endatasjekken });
        break;
      case 'muntligsjekken':
        contentService.set('nb', { ...nbcontent, ...nbsystem, ...nbmuntligsjekken });
        contentService.set('nn', { ...nncontent, ...nnsystem, ...nnmuntligsjekken });
        contentService.set('en', { ...encontent, ...ensystem, ...enmuntligsjekken });
        break;
      case 'samletesten':
        contentService.set('nb', { ...nbcontent, ...nbsystem, ...nbsamletesten });
        contentService.unset('en');
        contentService.unset('nb');
        break;
      case '':
        contentService.set('nb', { ...nbcontent, ...nbsystem });
        contentService.set('nn', { ...nncontent, ...nnsystem });
        contentService.set('en', { ...encontent, ...ensystem });
        break;
      default:
        throwError('Content undecided in LessonResolverService');
        contentService.set('nb', { ...nbcontent, ...nbsystem });
        contentService.set('nn', { ...nncontent, ...nnsystem });
        contentService.set('en', { ...encontent, ...ensystem });
        break;
    }
  }
}
