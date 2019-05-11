import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import socket from "../../../api/socket";
@Component({
  selector: "app-socket-test",
  templateUrl: "./socket-test.component.html",
  styleUrls: ["./socket-test.component.scss"]
})
export class SocketTestComponent implements OnInit, OnDestroy {
  messages: string[] = [];
  constructor() {
    socket.on("messageReceived", this.onMessageReceived);
  }

  ngOnInit() {}

  ngOnDestroy() {}

  onMessageReceived = message => {
    this.messages.push(message);
  };

  onClick = message => {};
}
