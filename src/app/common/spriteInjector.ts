import { Injectable, Renderer2 } from '@angular/core';

@Injectable()
export class SpriteInjector {
  constructor(private readonly renderer: Renderer2) {}

  inject(origin: string) {
    window.addEventListener('load', $event => {
      const object: HTMLObjectElement = this.renderer.createElement('object');
      this.renderer.setAttribute(object, 'data', origin);
      this.renderer.listen(object, 'load', () => {
        const svg = object.contentDocument.querySelector('svg');
        this.renderer.insertBefore(document.body, svg, object);
        this.renderer.removeChild(document.body, object);
      });
      this.renderer.setStyle(object, 'width', '0px');
      this.renderer.setStyle(object, 'height', '0px');
      this.renderer.appendChild(document.querySelector('body'), object);
    });
  }
}
