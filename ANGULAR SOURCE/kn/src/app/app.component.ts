import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
      }
    `,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  class = '';

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setAttribute(this.document.body, 'class', this.class);
  }

  switchMode(newClass: string) {
    this.renderer.setAttribute(this.document.body, 'class', newClass);
  }
}
