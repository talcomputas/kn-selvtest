import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
    }
  `],
  template: `
    <app-layout>
      <router-outlet></router-outlet>
    </app-layout>`,
})
export class AppComponent {
}
