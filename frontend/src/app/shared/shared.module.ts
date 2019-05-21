import { CheckboxComponent } from "./checkbox/checkbox.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GsapToggleableDirective } from "./gsap-toggleable.directive";
import { OverlayModule } from "@angular/cdk/overlay";

@NgModule({
  declarations: [CheckboxComponent, GsapToggleableDirective],
  imports: [CommonModule],
  exports: [CheckboxComponent, GsapToggleableDirective, OverlayModule]
})
export class SharedModule {}
