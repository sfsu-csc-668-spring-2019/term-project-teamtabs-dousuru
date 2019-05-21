import { Socket } from "socket.io";

export class UserHandler {
  private static _instance: UserHandler;
  private sockets: Map<string, Socket>;

  private constructor(sockets: Map<string, Socket>) {
    if (UserHandler._instance) {
      throw new Error(
        "Instantiation failed: use UserHandler.getInstance() instead of new."
      );
    }
    this.sockets = sockets;
    this.chat = this.chat.bind(this);
    UserHandler._instance = this;
  }

  public static initializeInstance(sockets: Map<string, Socket>): void {
    if (UserHandler._instance) {
      throw new Error(
        "Instantiation failed: instance has already been initiated."
      );
    }
    new UserHandler(sockets);
  }

  public static getInstance(): UserHandler {
    return UserHandler._instance;
  }

  public disconnect(userId: string): void {
    this.sockets.delete(userId);
  }

  public chat(userId: string, room: string, message: any): void {
    const socket = this.sockets.get(userId);
    if (socket) {
      socket.emit(room, message);
    }
  }

  public update(userId: string, component: string, data: any): void {
    const socket = this.sockets.get(userId);
    if (socket) {
      socket.emit(component + ":update", data);
    }
  }
}
