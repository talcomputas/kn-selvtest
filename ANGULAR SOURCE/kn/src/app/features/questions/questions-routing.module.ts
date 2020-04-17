import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroPageComponent } from '@features/questions/pages/intro-page/intro-page.component';
import { QuestionsPageComponent } from '@features/questions/pages/questions-page/questions-page.component';
import { ResultPageComponent } from '@features/questions/pages/result-page/result-page.component';

const routes: Routes = [
  {
    path: '',
    component: IntroPageComponent,
  },
  {
    path: 'sporsmal/:page',
    component: QuestionsPageComponent,
  },
  {
    path: 'resultat',
    component: ResultPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionsRoutingModule {
}
