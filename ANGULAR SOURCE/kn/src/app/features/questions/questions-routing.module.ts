import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroPageComponent } from '@features/questions/pages/intro-page/intro-page.component';
import { QuestionsPageComponent } from '@features/questions/pages/questions-page/questions-page.component';
import { ResultPageComponent } from '@features/questions/pages/result-page/result-page.component';
import { RouteResolverService } from '@features/questions/services/route-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: IntroPageComponent,
    resolve: { name: RouteResolverService },
    data: { name: RouteResolverService },
  },
  {
    path: 'sporsmal/:page',
    component: QuestionsPageComponent,
    resolve: { name: RouteResolverService },
    data: { name: RouteResolverService },
  },
  {
    path: 'resultat',
    component: ResultPageComponent,
    resolve: { name: RouteResolverService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionsRoutingModule {}
