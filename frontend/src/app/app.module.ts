import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TodoModule } from "./todo/todo.module";
import { ThemeModule } from "./theme/theme.module";
import { HomepageComponent } from "./homepage/homepage.component";
import { HttpClientModule } from "@angular/common/http";
import { NetworkTestingModule } from "./network-testing/network-testing.module";

@NgModule({
  declarations: [AppComponent, HomepageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TodoModule,
    ThemeModule,
    NetworkTestingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
