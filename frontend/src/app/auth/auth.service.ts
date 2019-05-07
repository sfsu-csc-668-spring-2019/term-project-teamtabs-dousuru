import { Injectable } from "@angular/core";
import { LoggingService } from "../logging.service";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _authToken: string;
  private localStorageKey = "authToken";

  get authenticated(): Observable<boolean> {
    return of(!!this.authToken);
  }

  constructor(private loggingService: LoggingService) {
    this.authToken = localStorage.getItem(this.localStorageKey);
    this.loggingService.logAuthChange(!!this.authToken);
  }

  get authToken(): string {
    return this._authToken;
  }

  set authToken(newValue: string) {
    this._authToken = newValue;
    localStorage.setItem(this.localStorageKey, newValue);
    this.loggingService.logAuthChange(!!newValue);
  }
}
