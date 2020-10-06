import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
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
import nnContent from '@i18n/nynorsk.content.json';
import nbContent from '@i18n/bokmal.content.json';
import { QuestionSliderComponent } from './components/question-slider/question-slider.component';
import { Ng5SliderModule } from 'ng5-slider';

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
    ResultPageComponent,
    AnswersComponent,
    TransitionComponent,
    QuestionSliderComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuestionsRoutingModule,
    DragDropModule,
    SharedModule,
    ContentModule,
    RadioModule,
    ButtonModule,
    ButtonToggleModule,
    Ng5SliderModule,
  ],
  providers: [
    QuestionsService,
    StatisticsService,
    StatisticsApiService,
  ],
})
export class QuestionsModule {
  constructor(contentService: ContentService,
              statisticsService: StatisticsService,
              titleService: Title) {
    contentService.set('nb', nbContent);
    contentService.set('nn', nnContent);
    statisticsService.initUser();

    contentService
      .changes
      .subscribe(() => titleService.setTitle(`Kompetanse Norge - ${contentService.get('intro.title')}`));
  }
}
