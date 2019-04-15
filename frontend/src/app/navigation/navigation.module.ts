import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./navbar/navbar.component";
import { ThemeModule } from "../theme/theme.module";

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, ThemeModule],
  exports: [NavbarComponent]
})
export class NavigationModule {}
