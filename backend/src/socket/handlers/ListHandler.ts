import { Socket } from "socket.io";

export class ListHandler {
  private static _instance: ListHandler;
  private listSockets: Map<string, Map<string, Socket>>;
  private userSockets: Map<string, Socket>;
  private userLists: Map<string, string[]>;

  private constructor(
    listSockets: Map<string, Map<string, Socket>>,
    userSockets: Map<string, Socket>,
    userLists: Map<string, string[]>
  ) {
    if (ListHandler._instance) {
      throw new Error(
        "Instantiation failed: use ListHandler.getInstance() instead of new."
      );
    }
    this.listSockets = listSockets;
    this.userSockets = userSockets;
    this.userLists = userLists;
    this.join = this.join.bind(this);
    this.leave = this.leave.bind(this);
    this.chat = this.chat.bind(this);
    ListHandler._instance = this;
  }

  public static initializeInstance(
    listSockets: Map<string, Map<string, Socket>>,
    userSockets: Map<string, Socket>,
    userLists: Map<string, string[]>
  ): void {
    if (ListHandler._instance) {
      throw new Error(
        "Instantiation failed: instance has already been initiated."
      );
    }
    new ListHandler(listSockets, userSockets, userLists);
  }

  public static getInstance(): ListHandler {
    return ListHandler._instance;
  }

  public join(listId: string, userId: string, username: string): void {
    if (undefined === this.listSockets.get(listId)) {
      this.listSockets.set(listId, new Map());
    }
    if (undefined === this.userLists.get(userId)) {
      this.userLists.set(userId, []);
    }
    this.listSockets.get(listId).set(userId, this.userSockets.get(userId));
    if (!this.userLists.get(userId).includes(listId)) {
      this.userLists.get(userId).push(listId);
    }
    this.listSockets
      .get(listId)
      .forEach(userSocket =>
        userSocket.emit(`list:${listId}:join`, { userId, username })
      );
  }

  public leave(listId: string, userId: string, username: string): void {
    this.listSockets
      .get(listId)
      .forEach(userSocket =>
        userSocket.emit(`list:${listId}:leave`, { userId, username })
      );
  }

  public chat(listId: string, message: string): void {
    this.listSockets
      .get(listId)
      .forEach(userSocket => userSocket.emit(`list:${listId}:chat`, message));
  }

  public update(listId: string, data: any): void {
    this.listSockets
      .get(listId)
      .forEach(userSocket => userSocket.emit(`list:${listId}:update`, data));
  }
}
