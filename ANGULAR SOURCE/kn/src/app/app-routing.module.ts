import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@core/components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'lesetesten',
    loadChildren: () =>
      import('./features/questions/questions.module').then((m) => m.QuestionsModule),
  },
  {
    path: 'digitaltesten',
    loadChildren: () =>
      import('./features/questions/questions.module').then((m) => m.QuestionsModule),
  },
  {
    path: 'muntligtesten',
    loadChildren: () =>
      import('./features/questions/questions.module').then((m) => m.QuestionsModule),
  },
  {
    path: 'regnetesten',
    loadChildren: () =>
      import('./features/questions/questions.module').then((m) => m.QuestionsModule),
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
