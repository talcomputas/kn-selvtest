import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

// let questback: any;

@Component({
  selector: 'app-intro-page',
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroPageComponent implements OnInit {
  ngOnInit() {
    const qbId = 'km768r0njo';
    questback.popup.create('https://response.questback.com/vox/' + qbId, {
      title: 'Vinn et gavekort',
      text:
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
}
