import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ContentModule } from '@content/content.module';
import { ContentService } from '@content/services/content.service';
import { SharedModule } from '@shared/shared.module';
import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsService } from './services/questions.service';
import { StatisticsService } from './services/statistics.service';
import { StatisticsApiService } from './services/statistics-api.service';
import { IntroPageComponent } from './pages/intro-page/intro-page.component';
import { ResultPageComponent } from './pages/result-page/result-page.component';
import {
  CountdownDialogComponent,
  QuestionsPageComponent,
} from './pages/questions-page/questions-page.component';
import { QuestionCodeComponent } from './components/question-code/question-code.component';
import { QuestionRankingComponent } from './components/question-ranking/question-ranking.component';
import { QuestionDialogueComponent } from './components/question-dialogue/question-dialogue.component';
import { TransitionComponent } from './components/transition/transition.component';
import { QuestionSingleComponent } from './components/question-single/question-single.component';
import { QuestionMultipleComponent } from './components/question-multiple/question-multiple.component';
import { QuestionMultipleChoiceComponent } from './components/question-multiplechoice/question-multiplechoice.component';
import { QuestionHotspotComponent } from './components/question-hotspot/question-hotspot.component';
import { RadioModule } from '../../uikit/radio/radio.module';
import { ButtonModule } from '../../uikit/button/button.module';
import { ButtonToggleModule } from '../../uikit/button-toggle/button-toggle.module';

import nbContent from '@i18n/bokmal.content.json';
import nnContent from '@i18n/nynorsk.content.json';
import enContent from '@i18n/engelsk.content.json';

import nbSystemContent from '@i18n/bokmal.system.json';
import nnSystemContent from '@i18n/nynorsk.system.json';
import enSystemContent from '@i18n/engelsk.system.json';

import { QuestionSliderComponent } from './components/question-slider/question-slider.component';
import { QuestionMultipleDiffPointsComponent } from './components/question-multiple-diff-points/question-multiple-diff-points.component';
import { QuestionGroupsChoiceComponent } from '@features/questions/components/question-groups-choice/question-groups-choice.component';

import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';

import { StatisticsPageComponent } from './pages/statistics-page/statistics-page.component';
import { QuestionGradingComponent } from '@features/questions/components/question-grading/question-grading.component';
import { CalculatorComponent } from '@features/questions/components/calculator/calculator.component';
import { ExamplePageComponent } from '@features/questions/pages/example/example-page.component';
import { AnswersComponent } from '@features/questions/components/answers/answers.component';
import { AnswerDialogComponentComponent } from './components/answer-dialog/answer-dialog-component.component';
import { CountdownModule } from 'ngx-countdown';
import { ContentPipe } from '@content/pipes/content.pipe';
@NgModule({
  declarations: [
    IntroPageComponent,
    QuestionsPageComponent,
    QuestionSingleComponent,
    QuestionHotspotComponent,
    QuestionRankingComponent,
    QuestionCodeComponent,
    QuestionMultipleComponent,
    QuestionDialogueComponent,
    QuestionMultipleChoiceComponent,
    QuestionGradingComponent,
    ResultPageComponent,
    AnswersComponent,
    TransitionComponent,
    CalculatorComponent,
    QuestionSliderComponent,
    QuestionMultipleDiffPointsComponent,
    QuestionGroupsChoiceComponent,
    StatisticsPageComponent,
    ExamplePageComponent,
    AnswerDialogComponentComponent,
    CountdownDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    QuestionsRoutingModule,
    DragDropModule,
    SharedModule,
    ContentModule,
    RadioModule,
    ButtonModule,
    ButtonToggleModule,
    MatRadioModule,
    MatButtonModule,
    MatSliderModule,
    MatBadgeModule,
    MatIconModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatExpansionModule,
    CountdownModule,
  ],
  exports: [MatIconModule, CountdownDialogComponent],
  providers: [
    QuestionsService,
    StatisticsService,
    StatisticsApiService,
    CountdownDialogComponent,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
})
export class QuestionsModule {
  constructor(contentService: ContentService, statisticsService: StatisticsService) {
    contentService.set('nb', { ...nbContent, ...nbSystemContent });
    contentService.set('nn', { ...nnContent, ...nnSystemContent });
    contentService.set('en', { ...enContent, ...enSystemContent });

    statisticsService.initUser();
  }
}
