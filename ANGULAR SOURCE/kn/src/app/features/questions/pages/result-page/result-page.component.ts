import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Result } from '@features/questions/interfaces/result.interface';
import { QuestionsService } from '@features/questions/services/questions.service';
import { ContentService } from '@content/services/content.service';
import { ActivatedRoute } from '@angular/router';

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

declare var questback: any;

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss'],
})
export class ResultPageComponent implements OnInit, OnDestroy {
  public showAnswers: boolean;
  public result: Result;

  private readonly destroyed$ = new Subject<void>();

  private qbIdNb;
  private qbIdNn;

  name: string = '';

  constructor(
    private questionsService: QuestionsService,
    public contentService: ContentService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.name = data.name;
      switch (this.name) {
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
          //TODO: missing locale
          break;
        case 'regnesjekken':
          this.contentService.set('nb', { ...nbcontent, ...nbsystem, ...nbregnesjekken });
          this.contentService.set('nn', { ...nncontent, ...nnsystem, ...nnregnesjekken });
          break;
        default:
          break;
      }
    });
    // environment not working
    if (window.location.href.indexOf('muntligtesten') > -1) {
      this.qbIdNb = 'wf7hoxw7vh';
      this.qbIdNn = 'wmsg3i4nxj';
    } else if (window.location.href.indexOf('digitaltesten') > -1) {
      this.qbIdNb = '5qbzulst5d';
      this.qbIdNn = 'gnkzckfbbp';
    } else if (window.location.href.indexOf('regnetesten') > -1) {
      this.qbIdNb = 'ejelvlehqp';
      this.qbIdNn = 'hqivwkebty';
    } else if (window.location.href.indexOf('lesetesten') > -1) {
      this.qbIdNb = 'wzy4jqo0hw';
      this.qbIdNn = '562ajj0nzs';
    } else {
      console.warn('unknown questback ID');
    }

    if (this.contentService.getCtx() === 'nb') {
      this.openNbPopup();
    } else {
      this.openNnPopup();
    }
  }

  openNbPopup() {
    questback.popup.create('https://response.questback.com/vox/' + this.qbIdNb, {
      title: 'Vinn et gavekort',
      text:
        // tslint:disable-next-line:max-line-length
        'Din tilbakemelding er viktig for at produktene våre skal bli så gode som mulig. Vil du hjelpe oss med å forbedre denne testen? Du kan være med i trekningen av tre gavekort på 500 kroner. Det er mulig å gå fram og tilbake i undersøkelsen, og det tar cirka to minutter å svare på den.',
      delay: 2,
      buttons: [
        {
          type: 'participate',
          text: 'Ja, jeg vil vinne',
        },
        {
          type: 'decline',
          text: 'Nei takk',
        },
      ],
    });
  }

  openNnPopup() {
    questback.popup.create('https://response.questback.com/vox/' + this.qbIdNn, {
      title: 'Vinn et gavekort',
      text:
        // tslint:disable-next-line:max-line-length
        'Tilbakemeldinga di er viktig for at produkta våre skal bli så gode som mogleg. Vil du hjelpe oss med å gjere Datasjekken betre? Du kan vere med i trekkinga av tre gåvekort på 500 kroner i juni 2020. Det er mogleg å gå fram og tilbake i undersøkinga, og det tek cirka to minutt å svare på ho.',
      delay: 2,
      buttons: [
        {
          type: 'participate',
          text: 'Ja, jeg vil vinne',
        },
        {
          type: 'decline',
          text: 'Nei takk',
        },
      ],
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.questionsService.detach();
  }
}
