import { TestBed } from '@angular/core/testing';
import { LayoutDirective } from './layout.directive';

describe('LayoutDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LayoutDirective],
    });
  });
  it('should create an instance', () => {
    const directive = TestBed.inject(LayoutDirective);
    expect(directive).toBeTruthy();
  });
});
