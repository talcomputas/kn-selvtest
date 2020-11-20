import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Result } from '@features/questions/interfaces/result.interface';
import { QuestionsService } from '@features/questions/services/questions.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ContentService } from '@content/services/content.service';
import tester from './test.tester.json';
import sjekker from './test.sjekker.json';
import { MatDialog } from '@angular/material/dialog';
import { AnswerDialogComponentComponent } from '@features/questions/components/answer-dialog/answer-dialog-component.component';

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

  private qbIdNb: string;
  private qbIdNn: string;

  path: string;
  testing = false;

  constructor(
    private questionsService: QuestionsService,
    private activatedRoute: ActivatedRoute,
    public content: ContentService,
    public dialog: MatDialog,
  ) {
    if (this.testing) {
      //this.result = sjekker as any;
      this.result = tester as any;
    } else {
      this.result = this.questionsService.result();

      this.questionsService.attach();
      this.questionsService.changes$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
        this.result = this.questionsService.result();
        return this.result;
      });
    }
  }

  /*   openDialog(): void {
    const dialogRef = this.dialog.open(AnswerDialogComponentComponent, {
      panelClass: 'custom-dialog-container',
      maxWidth: '98vw',
      minHeight: 'calc(100vh - 90px)',
      height: 'auto',
      data: {
        result: this.result.data,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  } */

  ngOnInit() {
    // this.showAnswers = true;
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
    } else if (window.location.href.indexOf('samletesten') > -1) {
      this.qbIdNb = 'non_existing';
      this.qbIdNn = 'non_existing';
    }

    if (this.qbIdNb && this.qbIdNn) {
      if (this.content.getCtx() === 'nb') {
        this.openNbPopup();
      } else {
        this.openNnPopup();
      }
    }
  }

  openNbPopup() {
    questback.popup.create('https://response.questback.com/vox/' + this.qbIdNb, {
      width: 530,
      height: 'auto',
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
      width: 530,
      height: 'auto',
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
