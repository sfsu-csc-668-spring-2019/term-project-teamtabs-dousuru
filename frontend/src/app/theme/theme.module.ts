import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ThemeService } from "./theme.service";
import { ThemerComponent } from "./themer/themer.component";
import { ThemeChooserComponent } from "./theme-chooser/theme-chooser.component";

@NgModule({
  declarations: [ThemerComponent, ThemeChooserComponent],
  imports: [CommonModule],
  providers: [ThemeService],
  exports: [ThemerComponent, ThemeChooserComponent]
})
export class ThemeModule {}
