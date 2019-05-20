import { Socket } from "socket.io";

export class ProjectHandler {
  private static _instance: ProjectHandler;
  private projectSockets: Map<string, Map<string, Socket>>;
  private userSockets: Map<string, Socket>;
  private userProjects: Map<string, string[]>;

  private constructor(userSockets: Map<string, Socket>) {
    if (ProjectHandler._instance) {
      throw new Error(
        "Instantiation failed: use ProjectHandler.getInstance() instead of new."
      );
    }
    this.projectSockets = new Map();
    this.userProjects = new Map();
    this.userSockets = userSockets;
    this.join = this.join.bind(this);
    this.leave = this.leave.bind(this);
    this.chat = this.chat.bind(this);
    ProjectHandler._instance = this;
  }

  public static initializeInstance(userSockets: Map<string, Socket>): void {
    if (ProjectHandler._instance) {
      throw new Error(
        "Instantiation failed: instance has already been initiated."
      );
    }
    new ProjectHandler(userSockets);
  }

  public static getInstance(): ProjectHandler {
    return ProjectHandler._instance;
  }

  public join(projectId: string, userId: string, username: string): void {
    if (undefined === this.userSockets.get(userId)) {
      return;
    }
    if (undefined === this.projectSockets.get(projectId)) {
      this.projectSockets.set(projectId, new Map());
    }
    if (undefined === this.userProjects.get(userId)) {
      this.userProjects.set(userId, []);
    }
    this.projectSockets
      .get(projectId)
      .set(userId, this.userSockets.get(userId));
    if (!this.userProjects.get(userId).includes(projectId)) {
      this.userProjects.get(userId).push(projectId);
    }
    this.projectSockets
      .get(projectId)
      .forEach(userSocket =>
        userSocket.emit(`project:${projectId}:join`, { userId, username })
      );
  }

  public leave(projectId: string, userId: string, username: string): void {
    this.projectSockets
      .get(projectId)
      .forEach(userSocket =>
        userSocket.emit(`project:${projectId}:leave`, { userId, username })
      );
  }

  public disconnect(userId: string): void {
    const projects = this.userProjects.get(userId);
    if (projects) {
      projects.map(projectId =>
        this.projectSockets.get(projectId).delete(userId)
      );
    }
    this.userProjects.delete(userId);
  }

  public chat(projectId: string, message: any): void {
    this.projectSockets
      .get(projectId)
      .forEach(userSocket =>
        userSocket.emit(`project:${projectId}:chat`, message)
      );
  }

  public update(projectId: string, data: any): void {
    this.projectSockets
      .get(projectId)
      .forEach(userSocket =>
        userSocket.emit(`project:${projectId}:update`, data)
      );
  }

  public updateLists(projectId: string, data: any): void {
    this.projectSockets
      .get(projectId)
      .forEach(userSocket =>
        userSocket.emit(`project:${projectId}:update:lists`, data)
      );
  }
}
