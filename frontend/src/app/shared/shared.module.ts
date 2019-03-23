import { CheckboxComponent } from "./checkbox/checkbox.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [CheckboxComponent],
  imports: [CommonModule],
  exports: [CheckboxComponent]
})
export class SharedModule {}
