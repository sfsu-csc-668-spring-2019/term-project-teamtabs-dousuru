import { Injectable } from "@angular/core";
import { LoggingService } from "../logging.service";
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { ApiService } from "../networking/api.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _authToken: BehaviorSubject<string>;
  private localStorageKey = "authToken";
  authenticated: Observable<boolean>;

  constructor(private loggingService: LoggingService, private api: ApiService) {
    const authToken = localStorage.getItem(this.localStorageKey);
    this._authToken = new BehaviorSubject(authToken);
    this.loggingService.logAuthChange(!!this.authToken);
    this.authenticated = this._authToken
      .asObservable()
      .pipe(map(token => !!token));
  }

  get authToken(): string {
    const value = this._authToken.value;
    return value;
  }

  set authToken(newValue: string) {
    this._authToken.next(newValue);
    if (newValue) {
      localStorage.setItem(this.localStorageKey, newValue);
    } else {
      localStorage.removeItem(this.localStorageKey);
    }
    this.loggingService.logAuthChange(!!newValue);
  }

  login(identifier: string, password: string): Observable<boolean> {
    return this.api.login(identifier, password).pipe(
      map(({ token }) => {
        if (!token) {
          this.authToken = undefined;
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

  signout() {
    this.authToken = null;
  }
}
