import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./navbar/navbar.component";
import { ThemeModule } from "../theme/theme.module";
import { RouterModule } from "@angular/router";
import { AuthModule } from "../auth/auth.module";

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, ThemeModule, RouterModule, AuthModule],
  exports: [NavbarComponent]
})
export class NavigationModule {}
