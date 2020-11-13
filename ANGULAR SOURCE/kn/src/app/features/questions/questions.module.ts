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
import { QuestionsPageComponent } from './pages/questions-page/questions-page.component';
import { AnswersComponent } from './components/answers/answers.component';
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
import { StatisticsPageComponent } from './pages/statistics-page/statistics-page.component';
import { QuestionGradingComponent } from '@features/questions/components/question-grading/question-grading.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

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
    QuestionSliderComponent,
    QuestionMultipleDiffPointsComponent,
    QuestionGroupsChoiceComponent,
    StatisticsPageComponent,
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
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
  ],
  providers: [QuestionsService, StatisticsService, StatisticsApiService, { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }, ],
})
export class QuestionsModule {
  constructor(
    contentService: ContentService,
    statisticsService: StatisticsService,
    titleService: Title,
  ) {
    contentService.set('nb', { ...nbContent, ...nbSystemContent });
    contentService.set('nn', { ...nnContent, ...nnSystemContent });
    contentService.set('en', { ...enContent, ...enSystemContent });

    statisticsService.initUser();

    contentService.changes.subscribe(() =>
      titleService.setTitle(`Kompetanse Norge - ${contentService.get('intro.title')}`),
    );
  }
}
