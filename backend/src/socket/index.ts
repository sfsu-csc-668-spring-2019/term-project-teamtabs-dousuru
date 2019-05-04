import { Server } from "http";
import {
  OrganizationHandler,
  ProjectHandler,
  ListHandler,
  TaskHandler,
  UserHandler
} from "./handlers";
import SocketIO, { Socket } from "socket.io";
import authenticate from "../middleware/authMiddleware";

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
          const { user } = socket.request;
          const userId = user.id;
          this.userSockets.set(userId, socket);
          socket.on("disconnect", () => {
            this.deleteUserFromUserSocketList(userId);
            this.deleteUserFromOrganizationUserSocketList(userId);
            this.deleteUserFromProjectUserSocketList(userId);
            this.deleteUserFromListUserSocketList(userId);
            this.deleteUserFromTaskUserSocketList(userId);
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  private deleteUserFromUserSocketList(userId: string): void {
    this.userSockets.delete(userId);
  }

  private deleteUserFromOrganizationUserSocketList(userId: string): void {
    this.userOrganizations
      .get(userId)
      .map(organizationId =>
        this.organizationUserSockets.get(organizationId).delete(userId)
      );
    this.userOrganizations.delete(userId);
  }
  private deleteUserFromProjectUserSocketList(userId: string): void {
    this.userProjects
      .get(userId)
      .map(projectId => this.projectUserSockets.get(projectId).delete(userId));
    this.userProjects.delete(userId);
  }
  private deleteUserFromListUserSocketList(userId: string): void {
    this.userLists
      .get(userId)
      .map(listId => this.listUserSockets.get(listId).delete(userId));
    this.userLists.delete(userId);
  }
  private deleteUserFromTaskUserSocketList(userId: string): void {
    this.userTasks
      .get(userId)
      .map(taskId => this.taskUserSockets.get(taskId).delete(userId));
    this.userTasks.delete(userId);
  }

  private initializeHandlers(): void {
    OrganizationHandler.initializeInstance(
      this.organizationUserSockets,
      this.userSockets,
      this.userOrganizations
    );
    ProjectHandler.initializeInstance(
      this.projectUserSockets,
      this.userSockets,
      this.userProjects
    );
    ListHandler.initializeInstance(
      this.listUserSockets,
      this.userSockets,
      this.userLists
    );
    TaskHandler.initializeInstance(
      this.taskUserSockets,
      this.userSockets,
      this.userTasks
    );
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
