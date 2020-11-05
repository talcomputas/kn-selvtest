import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Result } from '@features/questions/interfaces/result.interface';
import { QuestionsService } from '@features/questions/services/questions.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ContentService } from '@content/services/content.service';
import { QuestionType } from '@features/questions/enums/question-type.enum';

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

  constructor(
    private questionsService: QuestionsService,
    private activatedRoute: ActivatedRoute,
    public content: ContentService,
  ) {
    /* this.result = {
      level: {
        id: '3',
        title: 'Basert på dine svar er du på nivå 3 av 3 i denne testen.',
        text:
          'Digitale ferdigheter på nivå 3 innebærer å være en reflektert bruker av sammensatte digitale verktøy og tjenester. Fordi utviklingen innen digitale ferdigheter går fort, er det allikevel slik at vi må regne med å lære nye verktøy og tjenester.',
        minScore: 3,
      },
      score: 8,
      maxScore: 8,
      data: [
        {
          id: 1,
          type: 'slider',
          text: 'Hvilket tall peker pilen på?',
          correct: 130,
          selected: 128,
          isCorrect: false,
        },
        {
          id: 2,
          type: 'single',
          text: 'Kvar er det <b>IKKJE</b> mogleg å kjøpe dataspel?',
          correct: { id: 4, text: 'På YouTube' },
          selected: { id: 4, text: 'På YouTube' },
          isCorrect: true,
        },
        {
          id: 3,
          type: 'multiple',
          text:
            'Hvordan kan sosiale medier gi målrettet reklame tilpasset den enkelte? <b>(Velg to alternativ)</b>',
          correct: [
            { id: 1, text: 'De sjekker hvor mobilen din har vært' },
            { id: 2, text: 'De sjekker språket på mobilen din' },
          ],
          selected: [
            { id: 1, text: 'De sjekker hvor mobilen din har vært' },
            { id: 2, text: 'De sjekker språket på mobilen din' },
          ],
          isCorrect: true,
        },
        {
          id: 4,
          type: 'hotspot',
          text: 'Hvor trykker du for å søke etter en bestemt tv-serie?',
          correct: { id: 2, x: 29, y: 79, width: 15, height: 17 },
          selected: { id: 2, x: 29, y: 79, width: 15, height: 17 },
          isCorrect: true,
          image: 'CbJojWjnkuqk6OK9Jgg.png?v=2',
        },
        {
          id: 5,
          type: 'dialogue',
          speech: [
            {
              id: 'D17F2',
              person: 'Sebastian',
              text:
                'Du skal hjelpe vennen din med å lage en Instagram-profil, så han kan delta på sosiale medier.',
              type: 'intro',
              next: 'D17F1',
            },
            {
              id: 'D17F1',
              person: 'Sebastian',
              text:
                'Hei, jeg skal opprette en Instagram-profil. Hva slags passord er det best å ha?',
              type: 'question',
              options: ['D17F3', 'D17F4', 'D17F5'],
            },
            {
              id: 'D17F3',
              person: 'Player',
              text: 'Et som består av flere tilfeldige tall og bokstaver.',
              type: 'option',
              next: 'D17F8',
            },
            {
              id: 'D17F4',
              person: 'Player',
              text: 'Et som består av forskjellige tegn og tall.',
              type: 'option',
              next: 'D17F8',
            },
            {
              id: 'D17F5',
              person: 'Player',
              text: 'Et som består av forskjellige ord etter hverandre med sammenheng.',
              type: 'option',
              next: 'D17F6',
            },
            {
              id: 'D17F8',
              person: 'Sebastian',
              text:
                'Det er ikke det jeg har hørt, men du vet når det står "husk meg". Når burde man IKKE bruke det?',
              type: 'question',
              options: ['D17F10', 'D17F11', 'D17F12'],
            },
            {
              id: 'D17F6',
              person: 'Sebastian',
              text:
                'Wow, det visste jeg ikke! Her står det også at jeg kan trykke på "husk meg". Når burde man IKKE bruke det?',
              type: 'question',
              options: ['D17F10', 'D17F11', 'D17F12'],
            },
            {
              id: 'D17F10',
              person: 'Player',
              text: 'Hvis flere bruker samme enhet.',
              type: 'option',
              next: 'D17F13',
            },
            {
              id: 'D17F11',
              person: 'Player',
              text: 'Når man har dårlig tid.',
              type: 'option',
              next: 'D17F17',
            },
            {
              id: 'D17F12',
              person: 'Player',
              text: 'Om man lett glemmer passord.',
              type: 'option',
              next: 'D17F17',
            },
            {
              id: 'D17F13',
              person: 'Sebastian',
              text: 'Skjønner. Kan du hjelpe meg med å opprette en profil på Instagram?',
              type: 'completion',
            },
            {
              id: 'D17F17',
              person: 'Sebastian',
              text:
                'Det høres ikke logisk ut, men greit. Kan du hjelpe meg med å opprette en profil på Instagram?',
              type: 'completion',
            },
          ],
          correct: [
            {
              id: 'D17F1',
              person: 'Sebastian',
              text:
                'Hei, jeg skal opprette en Instagram-profil. Hva slags passord er det best å ha?',
              type: 'question',
              options: ['D17F3', 'D17F4', 'D17F5'],
            },
            {
              id: 'D17F5',
              person: 'Player',
              text: 'Et som består av forskjellige ord etter hverandre med sammenheng.',
              type: 'option',
              next: 'D17F6',
            },
            {
              id: 'D17F6',
              person: 'Sebastian',
              text:
                'Wow, det visste jeg ikke! Her står det også at jeg kan trykke på "husk meg". Når burde man IKKE bruke det?',
              type: 'question',
              options: ['D17F10', 'D17F11', 'D17F12'],
            },
            {
              id: 'D17F10',
              person: 'Player',
              text: 'Hvis flere bruker samme enhet.',
              type: 'option',
              next: 'D17F13',
            },
            {
              id: 'D17F13',
              person: 'Sebastian',
              text: 'Skjønner. Kan du hjelpe meg med å opprette en profil på Instagram?',
              type: 'completion',
            },
          ],
          selected: [
            {
              id: 'D17F1',
              person: 'Sebastian',
              text:
                'Hei, jeg skal opprette en Instagram-profil. Hva slags passord er det best å ha?',
              type: 'question',
              options: ['D17F3', 'D17F4', 'D17F5'],
            },
            {
              id: 'D17F3',
              person: 'Player',
              text: 'Et som består av flere tilfeldige tall og bokstaver.',
              type: 'option',
              next: 'D17F8',
            },
            {
              id: 'D17F8',
              person: 'Sebastian',
              text:
                'Det er ikke det jeg har hørt, men du vet når det står "husk meg". Når burde man IKKE bruke det?',
              type: 'question',
              options: ['D17F10', 'D17F11', 'D17F12'],
            },
            {
              id: 'D17F10',
              person: 'Player',
              text: 'Hvis flere bruker samme enhet.',
              type: 'option',
              next: 'D17F13',
            },
            {
              id: 'D17F13',
              person: 'Sebastian',
              text: 'Skjønner. Kan du hjelpe meg med å opprette en profil på Instagram?',
              type: 'completion',
            },
          ],
          isCorrect: false,
        },
        {
          id: 6,
          type: 'code',
          text: 'Hvor mange av feltene er det obligatorisk å fylle ut?',
          correct: 2,
          selected: 2,
          isCorrect: true,
        },
        {
          id: 7,
          type: 'ranking',
          text: 'Dra og slipp passordene i riktig rekkefølge. Sett det sikreste øverst.',
          correct: [
            { id: 2, text: 'Kebab1Lompe2Med3Grønnsaker4' },
            { id: 4, text: 'BatWoman62' },
            { id: 1, text: 'hemmelig123' },
            { id: 3, text: 'passord' },
          ],
          selected: [
            { id: 2, text: 'Kebab1Lompe2Med3Grønnsaker4' },
            { id: 1, text: 'hemmelig123' },
            { id: 3, text: 'passord' },
            { id: 4, text: 'BatWoman62' },
          ],
          isCorrect: false,
        },
        {
          id: 8,
          type: 'groups-choice',
          text:
            'Henrik bladde fram til sidene med boligannonser. Leiligheten deres var %s for liten for dem, så nå lette de etter %s større. De ville gjerne flytte ut på landet. De lette etter en liten %s hvor det var plass til å ha et par %s.',
          correct: [
            { id: 4, text: 'blitt' },
            { id: 2, text: 'noe' },
            { id: 3, text: 'gård' },
            { id: 2, text: 'hester' },
          ],
          selected: [
            { id: 4, text: 'blitt' },
            { id: 4, text: 'flere' },
            { id: 3, text: 'gård' },
            { id: 4, text: 'foredrag' },
          ],
          isCorrect: false,
        },
      ],
    }; */

    this.result = this.questionsService.result();

    this.questionsService.attach();
    this.questionsService.changes$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.result = this.questionsService.result();
      return this.result;
    });
  }

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

    if (this.content.getCtx() === 'nb') {
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
