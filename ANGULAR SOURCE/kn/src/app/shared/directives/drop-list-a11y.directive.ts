import { AfterContentInit, ContentChildren, Directive, ElementRef, forwardRef, Inject, QueryList } from '@angular/core';
import { FocusableOption, FocusKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

@Directive({
  selector: '[appDragA11y]',
  host: {
    '[attr.tabindex]': '0',
    '(focus)': 'handleFocus()',
  },
})
export class DragA11yDirective implements FocusableOption {
  constructor(private elRef: ElementRef<HTMLElement>,
              @Inject(forwardRef(() => DropListA11yDirective))
              private selectionList: DropListA11yDirective) {
  }

  /**
   * Returns the list item's text label. Implemented as a part of the FocusKeyManager.
   */
  getLabel(): string {
    return this.elRef.nativeElement.textContent || '';
  }

  focus(): void {
    this.elRef.nativeElement.focus();
  }

  handleFocus(): void {
    this.selectionList.setFocusedOption(this);
  }
}


@Directive({
  selector: '[appDropListA11y]',
  host: {
    '[attr.tabindex]': '-1',
    '(keydown)': 'keydown($event)',
  },
})
export class DropListA11yDirective implements AfterContentInit, FocusableOption {
  private keyManager: FocusKeyManager<DragA11yDirective>;

  @ContentChildren(DragA11yDirective, { descendants: true })
  private options: QueryList<DragA11yDirective>;

  constructor(private elRef: ElementRef,
              private cdkDropList: CdkDropList) {
  }

  ngAfterContentInit(): void {
    this.keyManager = new FocusKeyManager<DragA11yDirective>(this.options)
    // Allow disabled items to be focusable. For accessibility reasons, there must be a way for
    // screenreader users, that allows reading the different options of the list.
      .skipPredicate(() => false);
  }

  setFocusedOption(option: DragA11yDirective): void {
    this.keyManager.updateActiveItem(option);
  }

  /** Focuses the selection list. */
  focus(): void {
    this.elRef.nativeElement.focus();
  }

  /** Passes relevant key presses to our key manager. */
  keydown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    const manager = this.keyManager;
    const data = this.cdkDropList.data;
    const lastDataIndex = data && data.length - 1 || 0;

    const currIndex = manager.activeItemIndex;
    const prevIndex = currIndex > 0 ? currIndex - 1 : 0;
    const nextIndex = currIndex < lastDataIndex ? currIndex + 1 : lastDataIndex;

    switch (keyCode) {
      case UP_ARROW:
        moveItemInArray(data, currIndex, prevIndex);
        this.cdkDropList.dropped.emit();
        setTimeout(() => manager.setActiveItem(prevIndex));
        event.preventDefault();
        break;

      case DOWN_ARROW:
        moveItemInArray(data, currIndex, nextIndex);
        event.preventDefault();
        break;

      default:
        manager.onKeydown(event);
    }
  }
}
