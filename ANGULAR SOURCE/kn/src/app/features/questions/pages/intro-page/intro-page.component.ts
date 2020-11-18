import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '@content/services/content.service';
import { QuestionsService } from '@features/questions/services/questions.service';

// let questback: any;

@Component({
  selector: 'app-intro-page',
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.scss'],
})
export class IntroPageComponent implements OnInit {
  path: string;
  hasExample = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    public contentService: ContentService,
    titleService: Title,
    public questionsService: QuestionsService,
  ) {
    this.contentService.changes.subscribe(() =>
      titleService.setTitle(`Kompetanse Norge - ${contentService.get('intro.title')}`),
    );
  }

  ngOnInit(): void {
    try {
      this.contentService.get('example');
      this.hasExample = true;
    } catch (error) {
      this.hasExample = false;
    }
    this.path = this.activatedRoute.snapshot.data.path;
  }
}
