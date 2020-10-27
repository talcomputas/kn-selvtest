import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-screen-reader',
  templateUrl: './screen-reader.component.html',
  styleUrls: ['./screen-reader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenReaderComponent {
  constructor() {
    this.load();
  }

  public onRead(): void {
    // tslint:disable-next-line
    (<any>window).vfact_SetCustomParams(3, 'M', 1);
    // tslint:disable-next-line
    (<any>window).vFact_doplay();
  }

  public onStop(): void {
    // tslint:disable-next-line
    (<any>window).vFact_dostop();
  }

  public onHelp(): void {
    // tslint:disable-next-line
    (<any>window).vFact_dohelp();
  }

  public onSettings(): void {
    // tslint:disable-next-line
    (<any>window).vFact_showconfigbox();
  }

  private load(): void {
    const id = 'leseweb';

    if (document.getElementById(id)) {
      return;
    }

    const lwfile = '1pxj1j9vcfl2tmlmfp8a.js';
    const lw = document.createElement('script');
    lw.type = 'text/javascript';
    lw.id = id;
    lw.async = true;
    lw.src =
      ('https:' === document.location.protocol ? 'https://' : 'http://') +
      'speech.leseweb.dk/script/' +
      lwfile;
    document.getElementsByTagName('head')[0].appendChild(lw);
  }
}
