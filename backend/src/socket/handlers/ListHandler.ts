import { Socket } from "socket.io";

export class ListHandler {
  private static _instance: ListHandler;
  private listSockets: Map<string, Map<string, Socket>>;
  private userSockets: Map<string, Socket>;
  private userLists: Map<string, string[]>;

  private constructor(userSockets: Map<string, Socket>) {
    if (ListHandler._instance) {
      throw new Error(
        "Instantiation failed: use ListHandler.getInstance() instead of new."
      );
    }

    this.listSockets = new Map();
    this.userLists = new Map();
    this.userSockets = userSockets;
    this.join = this.join.bind(this);
    this.leave = this.leave.bind(this);
    this.chat = this.chat.bind(this);
    ListHandler._instance = this;
  }

  public static initializeInstance(userSockets: Map<string, Socket>): void {
    if (ListHandler._instance) {
      throw new Error(
        "Instantiation failed: instance has already been initiated."
      );
    }
    new ListHandler(userSockets);
  }

  public static getInstance(): ListHandler {
    return ListHandler._instance;
  }

  public join(listId: string, userId: string, username: string): void {
    if (undefined === this.userSockets.get(userId)) {
      return;
    }
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

  public disconnect(userId: string): void {
    const lists = this.userLists.get(userId);
    if (lists) {
      lists.map(listId => this.listSockets.get(listId).delete(userId));
    }
    this.userLists.delete(userId);
  }

  public chat(listId: string, message: any): void {
    this.listSockets
      .get(listId)
      .forEach(userSocket => userSocket.emit(`list:${listId}:chat`, message));
  }

  public update(listId: string, data: any): void {
    this.listSockets
      .get(listId)
      .forEach(userSocket => userSocket.emit(`list:${listId}:update`, data));
  }

  public updateTasks(listId: string, data: any): void {
    this.listSockets
      .get(listId)
      .forEach(userSocket =>
        userSocket.emit(`list:${listId}:update:tasks`, data)
      );
  }
}
