import { Component, OnInit } from "@angular/core";
import { ThemeService } from "../theme.service";
import { light, dark } from "../Theme";

@Component({
  selector: "app-theme-chooser",
  templateUrl: "./theme-chooser.component.html",
  styleUrls: ["./theme-chooser.component.scss"]
})
export class ThemeChooserComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit() {}

  setLight() {
    this.themeService.theme = light;
  }

  setDark() {
    this.themeService.theme = dark;
  }
}
