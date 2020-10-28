import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-example-page',
  templateUrl: './example-page.component.html',
  styleUrls: ['./example-page.component.scss'],
})
export class ExamplePageComponent implements OnInit {
  path: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.path = this.activatedRoute.snapshot.data.path;
  }
}
