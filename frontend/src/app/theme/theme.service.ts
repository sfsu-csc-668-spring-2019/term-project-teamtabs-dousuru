import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { themes, Theme } from "./Theme";

@Injectable({
  providedIn: "root"
})
export class ThemeService {
  private themeSubject: BehaviorSubject<Theme>;

  constructor() {
    this.themeSubject = new BehaviorSubject(themes[0]);
  }

  get theme$(): Observable<Theme> {
    return this.themeSubject.asObservable();
  }

  get theme(): Theme {
    return this.themeSubject.getValue();
  }

  set theme(newTheme: Theme) {
    this.themeSubject.next(newTheme);
  }
}
