import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ThemeService } from "./theme/theme.service";
import { Theme } from "./theme/Theme";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(private themeService: ThemeService) {}
  currentTheme: Observable<Theme>;

  ngOnInit() {
    this.currentTheme = this.themeService.theme$;
  }
}
