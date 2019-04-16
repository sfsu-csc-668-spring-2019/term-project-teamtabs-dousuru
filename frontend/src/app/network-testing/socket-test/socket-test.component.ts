import { Component, OnInit, OnDestroy } from "@angular/core";
import { WebSocketService } from "../web-socket.service";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-socket-test",
  templateUrl: "./socket-test.component.html",
  styleUrls: ["./socket-test.component.scss"]
})
export class SocketTestComponent implements OnInit, OnDestroy {
  messages: string[] = [];
  private subscription: Subscription;
  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.webSocketService.makeSocket();
    this.subscription = this.webSocketService.messages$.subscribe(msg => {
      this.messages.push(msg);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClick() {
    this.webSocketService.sayHello();
  }
}
