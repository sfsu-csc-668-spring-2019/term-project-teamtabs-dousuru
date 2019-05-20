import { Injectable, ComponentRef } from "@angular/core";
import { OverlayRef, ComponentType, Overlay } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";

@Injectable({
  providedIn: "root"
})
export class ModalService {
  currentWindow: OverlayRef;
  constructor(private overlay: Overlay) {}

  open<T>(component: ComponentType<T>): ComponentRef<T> {
    const position = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
    const ref = this.overlay.create({
      positionStrategy: position,
      disposeOnNavigation: true,
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });
    const portal = new ComponentPortal(component);
    const portalRef = ref.attach(portal);
    // no need to unsub since the service exists for entire app lifecycle
    ref.backdropClick().subscribe(() => {
      this.close();
    });
    this.currentWindow = ref;
    return portalRef;
  }

  close() {
    if (this.currentWindow) {
      this.currentWindow.detach();
    }
  }
}
