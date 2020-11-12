import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from '@core/core.module';
import { AngularDraggableModule } from 'angular2-draggable';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoCacheHeadersInterceptor } from '@shared/interceptors/nocache.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpRequestInterceptor } from 'interceptors/http-request.interceptor';

import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutDirective } from '@shared/directives/layout.directive';
import { LanguageComponent } from '@core/components/language/language.component';
import { MatCardModule } from '@angular/material/card';

const material = [
  MatMenuModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
];
@NgModule({
  declarations: [AppComponent, LayoutDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    AngularDraggableModule,
    BrowserAnimationsModule,
    material,
  ],
  exports: [material],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoCacheHeadersInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent, LanguageComponent],
})
export class AppModule {}
