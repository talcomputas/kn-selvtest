import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { A11yModule } from '@angular/cdk/a11y';
import { ContentModule } from '@content/content.module';
import { ContentService } from '@content/services/content.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LanguageComponent } from './components/language/language.component';
import { LogoComponent } from './components/logo/logo.component';
import { RadioModule } from '../uikit/radio/radio.module';
import nbSystem from '@i18n/bokmal.system.json';
import nnSystem from '@i18n/nynorsk.system.json';
import { ButtonModule } from '../uikit/button/button.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    LogoComponent,
    LanguageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    A11yModule,
    RadioModule,
    ContentModule.forRoot(),
    SharedModule.forRoot(),
    ButtonModule,
  ],
  exports: [
    LayoutComponent,
  ],
})
export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule, contentService: ContentService) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }

    contentService.set('nb', nbSystem);
    contentService.set('nn', nnSystem);
    contentService.setCtx('nb');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
    };
  }
}
