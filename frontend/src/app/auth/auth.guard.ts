import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "./auth.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.authenticated.pipe(
      map(authenticated => {
        if (authenticated) {
          return true;
        } else {
          console.log("rerouting");
          return this.router.createUrlTree(["/"]);
        }
      })
    );
  }

  canLoad(route: Route, segments: UrlSegment[]) {
    return this.authService.authenticated;
  }
}
