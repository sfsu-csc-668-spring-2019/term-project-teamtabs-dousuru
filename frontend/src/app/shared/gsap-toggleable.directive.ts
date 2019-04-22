import { Directive, ElementRef, Input } from "@angular/core";
import { TweenMax } from "gsap";

@Directive({
  selector: "[appGsapToggleable]"
})
export class GsapToggleableDirective {
  constructor(private element: ElementRef) {}

  @Input("appGsapToggleable") info: ToggleDescriptor;

  @Input() gsapDuration = 1.0;

  @Input() set gsapToggled(on: boolean) {
    if (on) {
      TweenMax.fromTo(
        this.element.nativeElement,
        this.gsapDuration,
        this.info.off,
        this.info.on
      );
    } else {
      TweenMax.fromTo(
        this.element.nativeElement,
        this.gsapDuration,
        this.info.on,
        this.info.off
      );
    }
  }
}

export interface ToggleDescriptor {
  on: any;
  off: any;
}
