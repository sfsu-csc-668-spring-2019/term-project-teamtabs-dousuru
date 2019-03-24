import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpEventType,
  HttpResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  makeRequest(
    path: string,
    method: string,
    body: string
  ): Observable<HttpResponse<string>> {
    const request = new HttpRequest<string>(
      method,
      environment.apiRoot + path,
      body,
      {
        responseType: "text"
      }
    );
    return this.httpClient.request(request).pipe(
      filter((res: HttpEvent<HttpResponse<string>>) => {
        return res.type === HttpEventType.Response;
      }),
      // typescript can't infer type since we filter it above based on an enum
      map(res => (res as unknown) as HttpResponse<string>)
    );
  }
}
