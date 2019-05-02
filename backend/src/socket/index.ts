import { Server } from "http";
import {
  OrganizationHandler,
  ProjectHandler,
  ListHandler,
  TaskHandler,
  UserHandler
} from "./handlers";
import SocketIO, { Socket } from "socket.io";

export class DousuruIO {
  private static _instance: DousuruIO;
  private io: SocketIO.Server;
  private organizationUserSockets: Map<string, Map<string, Socket>>;
  private projectUserSockets: Map<string, Map<string, Socket>>;
  private listUserSockets: Map<string, Map<string, Socket>>;
  private taskUserSockets: Map<string, Map<string, Socket>>;
  private userSockets: Map<string, Socket>;
  private userOrganizations: Map<string, string[]>;
  private userProjects: Map<string, string[]>;
  private userLists: Map<string, string[]>;
  private userTasks: Map<string, string[]>;

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
    this.organizationUserSockets = new Map();
    this.projectUserSockets = new Map();
    this.listUserSockets = new Map();
    this.taskUserSockets = new Map();
    this.userSockets = new Map();
    this.userOrganizations = new Map();
    this.userProjects = new Map();
    this.userLists = new Map();
    this.userTasks = new Map();
  }

  private attachServer(server: Server): void {
    this.io.attach(server);
  }

  private setIOConnection(): void {
    this.io.on("connection", socket => {
      try {
        if (socket.request.user) {
          const { user: userId } = socket.request;
          this.userSockets.set(userId, socket);
          socket.on("disconnect", () => {
            this.userSockets.delete(userId);
            this.userOrganizations
              .get(userId)
              .map(organizationId =>
                this.organizationUserSockets.get(organizationId).delete(userId)
              );
            this.userProjects
              .get(userId)
              .map(projectId =>
                this.projectUserSockets.get(projectId).delete(userId)
              );
            this.userLists
              .get(userId)
              .map(listId => this.listUserSockets.get(listId).delete(userId));
            this.userTasks
              .get(userId)
              .map(taskId => this.taskUserSockets.get(taskId).delete(userId));
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  private initializeHandlers(): void {
    OrganizationHandler.initializeInstance(
      this.organizationUserSockets,
      this.userSockets
    );
    ProjectHandler.initializeInstance(
      this.projectUserSockets,
      this.userSockets
    );
    ListHandler.initializeInstance(this.listUserSockets, this.userSockets);
    TaskHandler.initializeInstance(this.taskUserSockets, this.userSockets);
    UserHandler.initializeInstance(this.userSockets);
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
