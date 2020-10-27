import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Result } from '@features/questions/interfaces/result.interface';
import { QuestionsService } from '@features/questions/services/questions.service';
import { ActivatedRoute } from '@angular/router';

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

  path: string;

  constructor(private questionsService: QuestionsService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.path = this.activatedRoute.snapshot.data.path;

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

    /*if (this.contentService.getCtx() === 'nb') {
      this.openNbPopup();
    } else {
      this.openNnPopup();
    }*/
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
