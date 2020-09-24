import { ChangeDetectionStrategy, Component, Directive, OnInit, ViewEncapsulation } from '@angular/core';

@Directive({ selector: '[app-card-label]', host: { class: 'card-label' } })
export class CardLabelDirective {
}

@Directive({ selector: '[app-card-header]', host: { class: 'card-header' } })
export class CardHeaderDirective {
}

@Directive({ selector: '[app-card-content]', host: { class: 'card-content' } })
export class CardContentDirective {
}

@Directive({ selector: '[app-card-footer]', host: { class: 'card-footer' } })
export class CardFooterDirective {
}

@Component({
  selector: 'app-card',
  host: { class: 'card' },
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
