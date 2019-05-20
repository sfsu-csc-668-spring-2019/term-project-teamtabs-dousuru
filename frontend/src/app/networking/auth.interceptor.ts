import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const url = new URL(req.url);
    if (this.authService.authToken && url.hostname !== "api.cloudinary.com") {
      const authReq = req.clone({
        headers: req.headers.append("Authorization", this.authService.authToken)
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
