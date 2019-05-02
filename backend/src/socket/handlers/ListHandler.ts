import { Socket } from "socket.io";

export class ListHandler {
  private static _instance: ListHandler;
  private listSockets: Map<string, Map<string, Socket>>;
  private userSockets: Map<string, Socket>;

  private constructor(
    listSockets: Map<string, Map<string, Socket>>,
    userSockets: Map<string, Socket>
  ) {
    if (ListHandler._instance) {
      throw new Error(
        "Instantiation failed: use ListHandler.getInstance() instead of new."
      );
    }
    this.listSockets = listSockets;
    this.userSockets = userSockets;
    this.join = this.join.bind(this);
    this.leave = this.leave.bind(this);
    this.chat = this.chat.bind(this);
    ListHandler._instance = this;
  }

  public static initializeInstance(
    listSockets: Map<string, Map<string, Socket>>,
    userSockets: Map<string, Socket>
  ): void {
    if (ListHandler._instance) {
      throw new Error(
        "Instantiation failed: instance has already been initiated."
      );
    }
    new ListHandler(listSockets, userSockets);
  }

  public static getInstance(): ListHandler {
    return ListHandler._instance;
  }

  public join(listId: string, userId: string, userName: string): void {
    if (undefined === this.listSockets.get(listId)) {
      this.listSockets.set(listId, new Map());
    }
    this.listSockets.get(listId).set(userId, this.userSockets.get(userId));
    this.listSockets
      .get(listId)
      .forEach(userSocket =>
        userSocket.emit(`list:${listId}:join`, { userId, userName })
      );
  }

  public leave(listId: string, userId: string, userName: string): void {
    this.listSockets
      .get(listId)
      .forEach(userSocket =>
        userSocket.emit(`list:${listId}:leave`, { userId, userName })
      );
  }

  public chat(listId: string, message: string): void {
    this.listSockets
      .get(listId)
      .forEach(userSocket => userSocket.emit(`list:${listId}:chat`, message));
  }
}
