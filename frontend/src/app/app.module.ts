import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TodoModule } from "./todo/todo.module";
import { ThemeModule } from "./theme/theme.module";
import { HomepageComponent } from "./homepage/homepage.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NetworkTestingModule } from "./network-testing/network-testing.module";
import { NavigationModule } from "./navigation/navigation.module";
import { AuthModule } from "./auth/auth.module";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthInterceptor } from "./networking/auth.interceptor";
import { DashboardModule } from "./dashboard/dashboard.module";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { LogoutComponent } from "./logout/logout.component";
import { JoinOrganizationComponent } from "./join-organization/join-organization.component";
import { CloudinaryModule } from "@cloudinary/angular-5.x";
import * as Cloudinary from "cloudinary-core";
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    LandingPageComponent,
    LogoutComponent,
    JoinOrganizationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NavigationModule,
    AuthModule,
    TodoModule,
    ThemeModule,
    DashboardModule,
    NetworkTestingModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: "dqxyppabj" }),
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class AppModule {}
