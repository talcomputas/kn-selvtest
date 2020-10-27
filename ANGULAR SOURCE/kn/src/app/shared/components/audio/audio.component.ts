import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioComponent implements OnChanges, OnDestroy {
  @Input()
  public readonly url: string;

  @Input()
  public readonly trigger: ElementRef;

  public isPlaying: boolean;

  private audio: HTMLAudioElement;

  private timeupdateListener: () => void;
  private triggerListeners: (() => void)[] = [];

  constructor(
    private eRef: ElementRef,
    private cdRef: ChangeDetectorRef,
    private renderer: Renderer2,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { url, trigger } = changes;

    if (url) {
      this.audio = new Audio(this.url);
    }

    if (trigger) {
      this.attachTriggerEvents();
    }
  }

  ngOnDestroy(): void {
    this.pause();
    this.detachTriggerEvents();

    if (this.timeupdateListener) {
      this.timeupdateListener();
    }
  }

  @HostListener('click')
  public onClick(): void {
    if (this.audio.paused) {
      this.play();
      return;
    }

    this.pause();
  }

  @HostListener('document:click', ['$event'])
  public clickOut(event: Event): void {
    if (this.eRef.nativeElement.contains(event.target)) {
      return;
    }

    this.pause();
  }

  private play(): void {
    this.audio.currentTime = 0;
    this.audio.play();
    this.isPlaying = true;
    this.cdRef.detectChanges();
    this.update();
  }

  private update(): void {
    this.timeupdateListener = this.renderer.listen(this.audio, 'timeupdate', () => {
      if (this.audio.paused) {
        this.isPlaying = false;
        this.cdRef.detectChanges();
        this.timeupdateListener();
      }
    });
  }

  private pause(): void {
    this.audio.pause();
  }

  private attachTriggerEvents(): void {
    this.detachTriggerEvents();

    if (!this.trigger) {
      return;
    }

    this.triggerListeners = [
      ...this.triggerListeners,
      this.renderer.listen(this.trigger.nativeElement, 'keyup.space', () => this.onClick()),
      this.renderer.listen(this.trigger.nativeElement, 'keyup.enter', () => this.onClick()),
    ];
  }

  private detachTriggerEvents(): void {
    if (this.triggerListeners && this.triggerListeners.length) {
      this.triggerListeners.forEach((fn: () => void) => fn());
      this.triggerListeners = [];
    }
  }
}
