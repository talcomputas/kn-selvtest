import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '@content/services/content.service';
import { QuestionsService } from '@features/questions/services/questions.service';
import { QuestionType } from '@features/questions/enums/question-type.enum';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionGroupsChoice } from '@features/questions/interfaces/question-groups-choice.interface';
@Component({
  selector: 'app-example-page',
  templateUrl: './example-page.component.html',
  styleUrls: ['./example-page.component.scss'],
})
export class ExamplePageComponent implements OnInit, OnDestroy {
  path: string;
  question: QuestionGroupsChoice; // TODO: should not be hard-coded!
  public readonly QuestionType = QuestionType;
  public readonly group = new FormGroup({});
  constructor(
    private activatedRoute: ActivatedRoute,
    questionsService: QuestionsService,
    public contentService: ContentService,
  ) {}

  ngOnInit(): void {
    this.path = this.activatedRoute.snapshot.data.path;
    this.question = this.contentService.get('example.question');

    if (this.question.type === QuestionType.GROUPS_CHOICE) {
      const q = this.question as QuestionGroupsChoice;
      const skills = new FormArray([]);
      q.options.forEach(() => {
        skills.push(new FormControl(2, Validators.required));
      });
      this.group.addControl('1', skills);
      return;
    }
  }

  ngOnDestroy(): void {
    console.log('destory EVERYTHING');
    // throw new Error('Method not implemented.');
  }
}
