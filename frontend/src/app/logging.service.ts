import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LoggingService {
  constructor() {}

  logAuthChange(isAuthenticated: boolean) {
    console.log(`User is${isAuthenticated ? " " : " not "}authenticated`);
  }
}
