import {
  AfterViewChecked,
  Directive,
  ElementRef,
  Inject,
  inject,
  InjectionToken,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  SimpleChanges,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { take } from 'rxjs/operators';
import { IconRegistryService } from '@shared/services/icon-registry.service';

/**
 * Injection token used to provide the current location to `Icon`.
 * Used to handle server-side rendering and to stub out during unit tests.
 */
export const ICON_LOCATION = new InjectionToken<IconLocation>('icon-location', {
  providedIn: 'root',
  factory: ICON_LOCATION_FACTORY,
});

/**
 * Stubbed out location for `Icon`.
 */
export interface IconLocation {
  getPathname: () => string;
}

export function ICON_LOCATION_FACTORY(): IconLocation {
  const document = inject(DOCUMENT);
  const location = document ? document.location : null;

  return {
    // Note that this needs to be a function, rather than a property, because Angular
    // will only resolve it once, but we want the current path on each call.
    getPathname: () => location ? (location.pathname + location.search) : '',
  };
}

/** SVG attributes that accept a FuncIRI (e.g. `url(<something>)`). */
const funcIriAttributes = [
  'clip-path',
  'color-profile',
  'src',
  'cursor',
  'fill',
  'filter',
  'marker',
  'marker-start',
  'marker-mid',
  'marker-end',
  'mask',
  'stroke',
];

/** Selector that can be used to find all elements that are using a `FuncIRI`. */
const funcIriAttributeSelector = funcIriAttributes.map(attr => `[${attr}]`).join(', ');

/** Regex that can be used to extract the id out of a FuncIRI. */
const funcIriPattern = /^url\(['"]?#(.*?)['"]?\)$/;

@Directive({
  selector: '[app-svg-icon]',
  host: { class: 'svg-icon' },
})
export class SvgIconDirective implements OnChanges, OnDestroy, AfterViewChecked {
  @Input('app-svg-icon')
  appSvgIcon: string;

  /** Keeps track of the elements and attributes that we've prefixed with the current path. */
  private elementsWithExternalReferences?: Map<Element, { name: string, value: string }[]>;

  /** Keeps track of the current page path. */
  private previousPath?: string;

  constructor(private elementRef: ElementRef<HTMLElement>,
              private iconRegistryService: IconRegistryService,
              @Optional() @Inject(ICON_LOCATION)
              private location?: IconLocation) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Only update the inline SVG icon if the inputs changed, to avoid unnecessary DOM operations.
    const { appSvgIcon } = changes;

    if (appSvgIcon) {
      if (this.appSvgIcon) {
        const [namespace, iconName] = this._splitIconName(this.appSvgIcon);

        this.iconRegistryService.getNamedSvgIcon(iconName, namespace).pipe(take(1)).subscribe(
          svg => this._setSvgElement(svg),
          (err: Error) => console.log(`Error retrieving icon: ${err.message}`),
        );
      } else if (appSvgIcon.previousValue) {
        this._clearSvgElement();
      }
    }
  }

  ngAfterViewChecked(): void {
    const cachedElements = this.elementsWithExternalReferences;

    if (cachedElements && this.location && cachedElements.size) {
      const newPath = this.location.getPathname();

      // We need to check whether the URL has changed on each change detection since
      // the browser doesn't have an API that will let us react on link clicks and
      // we can't depend on the Angular router. The references need to be updated,
      // because while most browsers don't care whether the URL is correct after
      // the first render, Safari will break if the user navigates to a different
      // page and the SVG isn't re-rendered.
      if (newPath !== this.previousPath) {
        this.previousPath = newPath;
        this._prependPathToReferences(newPath);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.elementsWithExternalReferences) {
      this.elementsWithExternalReferences.clear();
    }
  }

  /**
   * Splits an svgIcon binding value into its icon set and icon name components.
   * Returns a 2-element array of [(icon set), (icon name)].
   * The separator for the two fields is ':'. If there is no separator, an empty
   * string is returned for the icon set and the entire value is returned for
   * the icon name. If the argument is falsy, returns an array of two empty strings.
   * Throws an error if the name contains two or more ':' separators.
   * Examples:
   *   `'social:cake' -> ['social', 'cake']
   *   'penguin' -> ['', 'penguin']
   *   null -> ['', '']
   *   'a:b:c' -> (throws Error)`
   */
  private _splitIconName(iconName: string): [string, string] {
    if (!iconName) {
      return ['', ''];
    }

    const parts = iconName.split(':');

    switch (parts.length) {
      case 1:
        return ['', parts[0]]; // Use default namespace.
      case 2:
        return parts as [string, string];
      default:
        throw Error(`Invalid icon name: "${iconName}"`);
    }
  }

  private _setSvgElement(svg: SVGElement) {
    this._clearSvgElement();

    // Workaround for IE11 and Edge ignoring `style` tags inside dynamically-created SVGs.
    // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/10898469/
    // Do this before inserting the element into the DOM, in order to avoid a style recalculation.
    const styleTags = svg.querySelectorAll('style') as NodeListOf<HTMLStyleElement>;

    for (let i = 0; i < styleTags.length; i++) {
      styleTags[i].textContent += ' ';
    }

    // Note: we do this fix here, rather than the icon registry, because the
    // references have to point to the URL at the time that the icon was created.
    if (this.location) {
      const path = this.location.getPathname();
      this.previousPath = path;
      this._cacheChildrenWithExternalReferences(svg);
      this._prependPathToReferences(path);
    }

    this.elementRef.nativeElement.appendChild(svg);
  }

  private _clearSvgElement() {
    const layoutElement: HTMLElement = this.elementRef.nativeElement;
    let childCount = layoutElement.childNodes.length;

    if (this.elementsWithExternalReferences) {
      this.elementsWithExternalReferences.clear();
    }

    // Remove existing non-element child nodes and SVGs, and add the new SVG element. Note that
    // we can't use innerHTML, because IE will throw if the element has a data binding.
    while (childCount--) {
      const child = layoutElement.childNodes[childCount];

      // 1 corresponds to Node.ELEMENT_NODE. We remove all non-element nodes in order to get rid
      // of any loose text nodes, as well as any SVG elements in order to remove any old icons.
      if (child.nodeType !== 1 || child.nodeName.toLowerCase() === 'svg') {
        layoutElement.removeChild(child);
      }
    }
  }

  /**
   * Prepends the current path to all elements that have an attribute pointing to a `FuncIRI`
   * reference. This is required because WebKit browsers require references to be prefixed with
   * the current path, if the page has a `base` tag.
   */
  private _prependPathToReferences(path: string) {
    const elements = this.elementsWithExternalReferences;

    if (elements) {
      elements.forEach((attrs, element) => {
        attrs.forEach(attr => {
          element.setAttribute(attr.name, `url('${path}#${attr.value}')`);
        });
      });
    }
  }

  /**
   * Caches the children of an SVG element that have `url()`
   * references that we need to prefix with the current path.
   */
  private _cacheChildrenWithExternalReferences(element: SVGElement) {
    const elementsWithFuncIri = element.querySelectorAll(funcIriAttributeSelector);
    const elements = this.elementsWithExternalReferences =
      this.elementsWithExternalReferences || new Map();

    for (let i = 0; i < elementsWithFuncIri.length; i++) {
      funcIriAttributes.forEach(attr => {
        const elementWithReference = elementsWithFuncIri[i];
        const value = elementWithReference.getAttribute(attr);
        const match = value ? value.match(funcIriPattern) : null;

        if (match) {
          let attributes = elements.get(elementWithReference);

          if (!attributes) {
            attributes = [];
            elements.set(elementWithReference, attributes);
          }

          attributes!.push({ name: attr, value: match[1] });
        }
      });
    }
  }
}
