import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthTesterComponent } from "./auth-tester/auth-tester.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AuthTesterComponent],
  imports: [CommonModule, FormsModule],
  exports: [AuthTesterComponent]
})
export class AuthModule {}
