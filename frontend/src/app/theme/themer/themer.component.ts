import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Observable } from "rxjs";
import { ThemeService } from "./../theme.service";
import { Theme } from "../Theme";

@Component({
  selector: "app-themer",
  templateUrl: "./themer.component.html",
  styleUrls: ["./themer.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class ThemerComponent implements OnInit {
  currentTheme: Observable<Theme>;
  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.currentTheme = this.themeService.theme$;
  }
}
