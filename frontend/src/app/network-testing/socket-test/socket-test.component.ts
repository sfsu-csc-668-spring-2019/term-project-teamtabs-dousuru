import { Component, OnInit, OnDestroy } from "@angular/core";
import { io, serverAddress } from "../../../api/socket";
import { AuthService } from "src/app/auth/auth.service";
@Component({
  selector: "app-socket-test",
  templateUrl: "./socket-test.component.html",
  styleUrls: ["./socket-test.component.scss"]
})
export class SocketTestComponent implements OnInit, OnDestroy {
  messages: string[] = [];
  socket: any = null;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.authToken;
    this.socket = io.connect(serverAddress, {
      query: `token=${this.authService.authToken}`
    });
    this.socket.on("messageReceived", this.onMessageReceived);
  }

  ngOnDestroy() {
    this.socket.off("messageReceived");
  }

  onMessageReceived = message => {
    this.messages.push(message);
  };

  onClick = message => {};
}
