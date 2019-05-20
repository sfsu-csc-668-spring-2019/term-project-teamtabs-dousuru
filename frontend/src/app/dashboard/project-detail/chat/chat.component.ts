import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Message, MessagePartition } from "../../../models";
import { DashboardStateService } from "../../dashboard-state.service";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"]
})
export class ChatComponent implements OnInit {
  upArrow = faChevronUp;
  downArrow = faChevronDown;
  collapsed = false;
  messages: Observable<Message[]>;

  messageForm = this.fb.group({
    message: ["", Validators.required]
  });

  constructor(private state: DashboardStateService, private fb: FormBuilder) {}

  ngOnInit() {
    this.messages = this.state.chat;
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  sendMessage() {
    if (!this.messageForm.valid) {
      return;
    }
    const { message: messageText } = this.messageForm.value;
    const message = new Message();
    const messagePartition = new MessagePartition();
    messagePartition.associatedValue = messageText;
    messagePartition.index = 0;
    messagePartition.type = "text";
    message.partitions = [messagePartition];
    this.state
      .sendMessage(message)
      .toPromise()
      .then(resolved => {
        console.log(resolved);
        this.messageForm.reset();
      });
  }

  getText(message: any) {
    const text = message.owner.username + ": ";
    return message.messagePartitions
      .filter(msg => msg.type === "text")
      .reduce((acc, val) => (acc += val.associatedValue), text);
  }
}
