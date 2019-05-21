import { map } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { ThemeService } from "../theme.service";
import { light, dark, Theme } from "../Theme";
import { Observable } from "rxjs";

@Component({
  selector: "app-theme-chooser",
  templateUrl: "./theme-chooser.component.html",
  styleUrls: ["./theme-chooser.component.scss"]
})
export class ThemeChooserComponent implements OnInit {
  currentTheme: Observable<Theme>;
  dark: Theme;
  light: Theme;
  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.currentTheme = this.themeService.theme$;
    this.dark = dark;
    this.light = light;
  }

  setLight() {
    this.themeService.theme = light;
  }

  setDark() {
    this.themeService.theme = dark;
  }

  selected(theme: Theme): Observable<boolean> {
    return this.currentTheme.pipe(
      map(newTheme => {
        return newTheme.equals(theme);
      })
    );
  }
}
