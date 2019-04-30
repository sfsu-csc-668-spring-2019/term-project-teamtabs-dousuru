import { CheckboxComponent } from "./checkbox/checkbox.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GsapToggleableDirective } from "./gsap-toggleable.directive";

@NgModule({
  declarations: [CheckboxComponent, GsapToggleableDirective],
  imports: [CommonModule],
  exports: [CheckboxComponent, GsapToggleableDirective]
})
export class SharedModule {}
