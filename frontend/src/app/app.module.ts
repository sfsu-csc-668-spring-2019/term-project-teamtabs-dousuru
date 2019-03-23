import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TodoModule } from "./todo/todo.module";
import { ThemeModule } from "./theme/theme.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TodoModule,
    ThemeModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}