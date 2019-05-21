import { Injectable } from "@angular/core";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class WebSocketService {
  private subject: WebSocketSubject<string>;

  get messages$(): Observable<string> {
    return this.subject.asObservable();
  }

  constructor() {}

  makeSocket() {
    this.subject = webSocket<string>(environment.socketRoot);
  }

  sayHello() {
    console.log("sending");
    this.subject.next("hi");
  }
}
