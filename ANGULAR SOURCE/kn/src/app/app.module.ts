import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from '@core/core.module';
import { AngularDraggableModule } from 'angular2-draggable';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoCacheHeadersInterceptor } from '@shared/interceptors/nocache.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StatisticsService } from '@features/questions/services/statistics.service';
import { StatisticsApiService } from '@features/questions/services/statistics-api.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    AngularDraggableModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoCacheHeadersInterceptor,
      multi: true,
    },
    StatisticsService,
    StatisticsApiService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
