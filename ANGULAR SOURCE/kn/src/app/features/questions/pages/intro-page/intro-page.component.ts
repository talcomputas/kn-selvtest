import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '@content/services/content.service';

// let questback: any;

@Component({
  selector: 'app-intro-page',
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.scss'],
})
export class IntroPageComponent implements OnInit {
  path: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    public contentService: ContentService,
    titleService: Title,
  ) {
    this.contentService.changes.subscribe(() =>
      titleService.setTitle(`Kompetanse Norge - ${contentService.get('intro.title')}`),
    );
  }

  ngOnInit(): void {
    this.path = this.activatedRoute.snapshot.data.path;
  }
}
