import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@core/components/home/home.component';
import { QuestionsModule } from '@features/questions/questions.module';
import { ChangeLessonGuard } from 'change-lesson.guard';
import { LessonResolverService } from 'lesson-resolver.service';
import { StatisticsPageComponent } from '@features/questions/pages/statistics-page/statistics-page.component';
import { RouteResolverService } from '@features/questions/services/route-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'lesetesten',
    loadChildren: () => QuestionsModule,
    resolve: { lessonPath: LessonResolverService },
    canActivate: [ChangeLessonGuard],
  },
  {
    path: 'regnetesten',
    loadChildren: () => QuestionsModule,
    resolve: { lessonPath: LessonResolverService },
    canActivate: [ChangeLessonGuard],
  },
  {
    path: 'digitaltesten',
    loadChildren: () => QuestionsModule,
    resolve: { lessonPath: LessonResolverService },
    canActivate: [ChangeLessonGuard],
  },
  {
    path: 'muntligtesten',
    loadChildren: () => QuestionsModule,
    resolve: { lessonPath: LessonResolverService },
    canActivate: [ChangeLessonGuard],
  },
  {
    path: 'leseskrivesjekken',
    loadChildren: () => QuestionsModule,
    resolve: { lessonPath: LessonResolverService },
    canActivate: [ChangeLessonGuard],
  },
  {
    path: 'regnesjekken',
    loadChildren: () => QuestionsModule,
    resolve: { lessonPath: LessonResolverService },
    canActivate: [ChangeLessonGuard],
  },
  {
    path: 'datasjekken',
    loadChildren: () => QuestionsModule,
    resolve: { lessonPath: LessonResolverService },
    canActivate: [ChangeLessonGuard],
  },
  {
    path: 'muntligsjekken',
    loadChildren: () => QuestionsModule,
    resolve: { lessonPath: LessonResolverService },
    canActivate: [ChangeLessonGuard],
  },
  {
    path: 'samletesten',
    loadChildren: () => QuestionsModule,
    resolve: { lessonPath: LessonResolverService },
    canActivate: [ChangeLessonGuard],
  },
  {
    path: 'statistikk',
    component: StatisticsPageComponent,
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LessonResolverService, ChangeLessonGuard],
})
export class AppRoutingModule {}
