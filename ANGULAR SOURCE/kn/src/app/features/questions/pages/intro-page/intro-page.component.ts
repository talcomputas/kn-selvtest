import { Component, OnInit } from '@angular/core';
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
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.path = this.activatedRoute.snapshot.data.path;
  }
}
