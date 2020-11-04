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
    this.result = {
      level: {
        id: '2',
        title: 'Basert på dine svar er du på nivå 2 av 3 i denne testen.',
        text:
          'Muntlige ferdigheter på nivå 2 innebærer at en kommuniserer aktivt om temaer av interesse i kjente sammenhenger. En kan ivareta egne interesser og behov i hverdagen og videreutvikle egen muntlig kommunikasjon ut fra behov.',
        minScore: 10,
      },
      score: 10,
      maxScore: 10,
      data: [
        {
          id: 1,
          type: QuestionType.RANKING,
          text:
            'Klikk på svaralternativene og ranger presentasjonene etter følgende situasjoner:<ol><li>Ny på jobb</li><li>Ny i prosjektgruppen</li><li>Ny bekjent på fest</li><li>Ny på fotballlaget</li></ol>',
          correct: [
            {
              id: 1,
              text: 'Hei, jeg heter Frans Kristiansen og skal jobbe med regnskap fremover.',
            },
            {
              id: 2,
              text:
                'Hei. Mitt navn er Frans Kristiansen og jeg er ansvarlig for regnskap i prosjektet.',
            },
            {
              id: 3,
              text: 'Hei. Jeg heter Frans og er barndomskompis med verten.',
            },
            {
              id: 4,
              text: 'Hei. Jeg heter Frans og er ny på laget, men har spilt i mange år.',
            },
          ],
          selected: [
            {
              id: 1,
              text: 'Hei, jeg heter Frans Kristiansen og skal jobbe med regnskap fremover.',
            },
            {
              id: 2,
              text:
                'Hei. Mitt navn er Frans Kristiansen og jeg er ansvarlig for regnskap i prosjektet.',
            },
            {
              id: 3,
              text: 'Hei. Jeg heter Frans og er barndomskompis med verten.',
            },
            {
              id: 4,
              text: 'Hei. Jeg heter Frans og er ny på laget, men har spilt i mange år.',
            },
          ],
          isCorrect: true,
        },
        {
          id: 2,
          type: QuestionType.RANKING,
          text:
            'Du skal overrekke en gave til avdelingslederen i anledning 50-årsdagen. <p>Hva vil du si når du overrekker gaven? Ranger kommentarene etter hvor passende de er.</p>',
          correct: [
            {
              id: 1,
              text: 'Gratulerer med dagen på vegne av avdelingen!',
            },
            {
              id: 2,
              text: 'Værsågod, den er til deg!',
            },
            {
              id: 3,
              text: 'Du kan bytte den!',
            },
            {
              id: 4,
              text: 'Pakk opp da!',
            },
          ],
          selected: [
            {
              id: 1,
              text: 'Gratulerer med dagen på vegne av avdelingen!',
            },
            {
              id: 2,
              text: 'Værsågod, den er til deg!',
            },
            {
              id: 3,
              text: 'Du kan bytte den!',
            },
            {
              id: 4,
              text: 'Pakk opp da!',
            },
          ],
          isCorrect: true,
        },
        {
          id: 3,
          type: QuestionType.SINGLE,
          text:
            'Ola står fast med en omfattende arbeidsoppgave. <p>Hvilket av alternativene passer best for å spørre en kollega om hjelp?</p>',
          correct: {
            id: 1,
            text: 'Jeg får det ikke til. Kan du hjelpe meg å komme i gang?',
          },
          selected: {
            id: 1,
            text: 'Jeg får det ikke til. Kan du hjelpe meg å komme i gang?',
          },
          isCorrect: true,
        },
        {
          id: 4,
          type: QuestionType.SINGLE,
          text:
            'Samuel føler at han ikke får brukt kompetansen sin på jobben og det gjør han frustrert. Han skal snakke med sjefen sin og be om å få oppgaver som passer han bedre. <p>Hva bør han si?</p>',
          correct: {
            id: 1,
            text:
              'Jeg har tatt flere kurs i kundebehandling og vil gjerne bidra i mer utfordrende oppgaver.',
          },
          selected: {
            id: 1,
            text:
              'Jeg har tatt flere kurs i kundebehandling og vil gjerne bidra i mer utfordrende oppgaver.',
          },
          isCorrect: true,
        },
        {
          id: 5,
          type: QuestionType.SINGLE,
          text:
            'Ola prater med Sara på jobben.<p>Klikk på det bildet hvor hun virker mest interessert i samtalen.</p>',
          correct: {
            id: 1,
            image: 'Bildet_1.jpg',
          },
          selected: {
            id: 1,
            image: 'Bildet_1.jpg',
          },
          isCorrect: true,
        },
        {
          id: 6,
          type: QuestionType.SINGLE,
          text:
            'Sarah er hos legen og får informasjon om sin videre behandling.<p>Hva bør hun gjøre?<p>',
          correct: {
            id: 1,
            text: 'Be legen snakke saktere',
          },
          selected: {
            id: 1,
            text: 'Be legen snakke saktere',
          },
          isCorrect: true,
        },
        {
          id: 7,
          type: QuestionType.SINGLE,
          text:
            'Linn møter Samuel ved kaffemaskinen mandag morgen. Samuel forteller at han har hatt en kjempespennende helg. <p>Hva bør Linn følge opp med for å fortsette samtalen?</p> ',
          correct: {
            id: 1,
            text: 'Så gøy! Hva gjorde du?',
          },
          selected: {
            id: 1,
            text: 'Så gøy! Hva gjorde du?',
          },
          isCorrect: true,
        },
        {
          id: 8,
          type: QuestionType.HOTSPOT,
          text:
            ' Lytt på lydklippet og klikk på brødavdelingen på kartet. Du kan lytte til lydklippet flere ganger om du ønsker.',
          correct: {
            id: 5,
            x: 50,
            y: 0,
            width: 35,
            height: 10,
          },
          selected: {
            id: 5,
            x: 50,
            y: 0,
            width: 35,
            height: 10,
          },
          isCorrect: true,
          image: 'kart.png',
        },
        {
          id: 9,
          type: QuestionType.SINGLE,
          text:
            'Sara er brannvernansvarlig og HR-sjefen, Hanne, forteller om nye brannvernrutiner som skal innføres umiddelbart. <p>Hvilket spørsmål bør Sara stille?</p>',
          correct: {
            id: 1,
            text: 'Hvordan blir jeg påvirket av dette?',
          },
          selected: {
            id: 1,
            text: 'Hvordan blir jeg påvirket av dette?',
          },
          isCorrect: true,
        },
        {
          id: 10,
          type: QuestionType.SINGLE,
          text:
            'Linn skal ut og spise lunsj med noen kollegaer. En av dem foreslår pizza. Linn liker ikke pizza. <p>Hva bør Linn gjøre?</p>',
          correct: {
            id: 1,
            text: 'Foreslå et annet sted å spise med flere valgmuligheter.',
          },
          selected: {
            id: 1,
            text: 'Foreslå et annet sted å spise med flere valgmuligheter.',
          },
          isCorrect: true,
        },
      ],
    };
    // this.result = this.questionsService.result();

    /*this.questionsService.attach();
    this.questionsService.changes$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.result = this.questionsService.result();
      return this.result;
    });*/
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
