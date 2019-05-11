import { Injectable } from "@angular/core";
import { LoggingService } from "../logging.service";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { ApiService } from "../networking/api.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _authToken: string;
  private localStorageKey = "authToken";

  get authenticated(): Observable<boolean> {
    return of(!!this.authToken);
  }

  constructor(private loggingService: LoggingService, private api: ApiService) {
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

  login(identifier: string, password: string): Observable<boolean> {
    return this.api.login(identifier, password).pipe(
      map(({ token }) => {
        if (!token) {
          this.authToken = null;
          return false;
        } else {
          this.authToken = token;
          return true;
        }
      })
    );
  }

  createAccount(
    username: string,
    email: string,
    password: string
  ): Observable<boolean> {
    return this.api.createAccount(username, email, password).pipe(
      map(({ token }) => {
        if (!token) {
          this.authToken = null;
          return false;
        } else {
          this.authToken = token;
          return true;
        }
      })
    );
  }
}
