import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CardComponent,
  CardContentDirective,
  CardFooterDirective,
  CardHeaderDirective,
  CardLabelDirective,
} from './components/card/card.component';
import { ColorDirective } from './directives/color.directive';
import { LabelComponent } from './components/label/label.component';
import { DomSanitizer } from '@angular/platform-browser';
import { IconRegistryService } from './services/icon-registry.service';
import { SvgIconDirective } from './directives/svg-icon.directive';
import { DropListControlValueAccessorDirective } from './directives/drop-list-control-value-accessor.directive';
import { DragA11yDirective, DropListA11yDirective } from './directives/drop-list-a11y.directive';
import { LevelComponent } from './components/level/level.component';
import { ProgressComponent } from './components/progress/progress.component';
import { ScreenReaderComponent } from './components/screen-reader/screen-reader.component';
import { ButtonModule } from '../uikit/button/button.module';
import { AudioComponent } from './components/audio/audio.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { AngularDraggableModule } from 'angular2-draggable';

@NgModule({
  declarations: [
    CardComponent,
    CardLabelDirective,
    CardHeaderDirective,
    CardContentDirective,
    CardFooterDirective,
    ColorDirective,
    LabelComponent,
    SvgIconDirective,
    DropListControlValueAccessorDirective,
    DragA11yDirective,
    DropListA11yDirective,
    LevelComponent,
    ProgressComponent,
    ScreenReaderComponent,
    AudioComponent,
    CalculatorComponent,
  ],
  imports: [CommonModule, ButtonModule, AngularDraggableModule],
  exports: [
    CardComponent,
    CardLabelDirective,
    CardHeaderDirective,
    CardContentDirective,
    CardFooterDirective,
    ColorDirective,
    LabelComponent,
    SvgIconDirective,
    DropListControlValueAccessorDirective,
    DragA11yDirective,
    DropListA11yDirective,
    LevelComponent,
    ProgressComponent,
    ScreenReaderComponent,
    AudioComponent,
    CalculatorComponent,
  ],
})
export class SharedModule {
  constructor(iconRegistry: IconRegistryService, domSanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      `arrow-forward`,
      domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/arrow-forward.svg`),
    );
    iconRegistry.addSvgIcon(
      `arrow-back`,
      domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/arrow-back.svg`),
    );
    iconRegistry.addSvgIcon(
      `close`,
      domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/close.svg`),
    );
    iconRegistry.addSvgIcon(
      `voice-message`,
      domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/voice-message.svg`),
    );
    iconRegistry.addSvgIcon(
      `voice-message-active`,
      domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/voice-message-active.svg`),
    );
    iconRegistry.addSvgIcon(
      `question-sign`,
      domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/question-sign.svg`),
    );
    iconRegistry.addSvgIcon(
      `settings`,
      domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/settings.svg`),
    );
    iconRegistry.addSvgIcon(
      `speaker`,
      domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/speaker.svg`),
    );
    iconRegistry.addSvgIcon(
      `stop`,
      domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/stop.svg`),
    );
    iconRegistry.addSvgIcon(
      `print`,
      domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/print.svg`),
    );
  }

  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [IconRegistryService],
    };
  }
}
