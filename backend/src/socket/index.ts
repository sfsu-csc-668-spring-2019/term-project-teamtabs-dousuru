import { Server } from "http";
import {
  OrganizationHandler,
  ProjectHandler,
  ListHandler,
  TaskHandler,
  UserHandler
} from "./handlers";
import SocketIO, { Socket } from "socket.io";
import authenticateSocket from "../middleware/socketAuthMiddleware";
import { User } from "../entity";

const HANDLERS: any[] = [
  OrganizationHandler,
  ProjectHandler,
  ListHandler,
  TaskHandler,
  UserHandler
];

export class DousuruIO {
  private static _instance: DousuruIO;
  private io: SocketIO.Server;
  private userSockets: Map<string, Socket>;

  private constructor(server: Server) {
    if (DousuruIO._instance) {
      throw new Error(
        "Instantiation failed: use DousuruIO.getInstance() instead of new."
      );
    }
    this.setDefaultValues();
    this.attachServer(server);
    this.setIOConnection();
    this.initializeHandlers();
    DousuruIO._instance = this;
  }

  private setDefaultValues(): void {
    this.io = SocketIO();
    this.userSockets = new Map();
  }

  private attachServer(server: Server): void {
    this.io.attach(server);
  }

  private setIOConnection(): void {
    this.io.on("connection", socket => {
      authenticateSocket(socket.handshake.query.token)
        .then((user: User) => {
          if (user) {
            socket.emit("messageReceived", JSON.stringify(user));
            const userId = user.id.toString();
            this.userSockets.set(userId, socket);
            socket.on("disconnect", () => {
              this.disconnectUserFromHandlers(userId);
            });
          }
        })
        .catch((error: string) => console.log(error));
    });
  }

  private disconnectUserFromHandlers(userId: string): void {
    HANDLERS.forEach(HandlerClass =>
      HandlerClass.getInstance().disconnect(userId)
    );
  }

  private initializeHandlers(): void {
    HANDLERS.forEach(HandlerClass =>
      HandlerClass.initializeInstance(this.userSockets)
    );
  }

  public static initializeInstance(server: Server): void {
    if (DousuruIO._instance) {
      throw new Error(
        "Instantiation failed: instance has already been initiated."
      );
    }
    new DousuruIO(server);
  }

  public static getInstance(): DousuruIO {
    return DousuruIO._instance;
  }
}
