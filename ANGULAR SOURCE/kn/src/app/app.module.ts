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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    AngularDraggableModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
  ],
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
  bootstrap: [AppComponent],
})
export class AppModule {}
