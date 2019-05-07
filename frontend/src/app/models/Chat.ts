import { Observable } from "rxjs";
import { Message } from "./Message";

export class Chat {
  messages: Observable<Message>;
}
