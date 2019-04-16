import { Injectable } from "@angular/core";
import { LoggingService } from "../logging.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _isAuthenticated: boolean;

  constructor(private loggingService: LoggingService) {
    this._isAuthenticated = localStorage.getItem("auth") === "true" || false;
    this.loggingService.logAuthChange(this._isAuthenticated);
  }

  get isAuthenticated() {
    return this._isAuthenticated;
  }

  set isAuthenticated(newValue: boolean) {
    this._isAuthenticated = newValue;
    localStorage.setItem("auth", newValue.toString());
    this.loggingService.logAuthChange(newValue);
  }
}
