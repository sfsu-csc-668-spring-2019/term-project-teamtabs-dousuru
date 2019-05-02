import { Socket } from "socket.io";

export class ProjectHandler {
  private static _instance: ProjectHandler;
  private projectSockets: Map<string, Map<string, Socket>>;
  private userSockets: Map<string, Socket>;

  private constructor(
    projectSockets: Map<string, Map<string, Socket>>,
    userSockets: Map<string, Socket>
  ) {
    if (ProjectHandler._instance) {
      throw new Error(
        "Instantiation failed: use ProjectHandler.getInstance() instead of new."
      );
    }
    this.projectSockets = projectSockets;
    this.userSockets = userSockets;
    this.join = this.join.bind(this);
    this.leave = this.leave.bind(this);
    this.chat = this.chat.bind(this);
    ProjectHandler._instance = this;
  }

  public static initializeInstance(
    projectSockets: Map<string, Map<string, Socket>>,
    userSockets: Map<string, Socket>
  ): void {
    if (ProjectHandler._instance) {
      throw new Error(
        "Instantiation failed: instance has already been initiated."
      );
    }
    new ProjectHandler(projectSockets, userSockets);
  }

  public static getInstance(): ProjectHandler {
    return ProjectHandler._instance;
  }

  public join(projectId: string, userId: string, userName: string): void {
    if (undefined === this.projectSockets.get(projectId)) {
      this.projectSockets.set(projectId, new Map());
    }
    this.projectSockets
      .get(projectId)
      .set(userId, this.userSockets.get(userId));
    this.projectSockets
      .get(projectId)
      .forEach(userSocket =>
        userSocket.emit(`project:${projectId}:join`, { userId, userName })
      );
  }

  public leave(projectId: string, userId: string, userName: string): void {
    this.projectSockets
      .get(projectId)
      .forEach(userSocket =>
        userSocket.emit(`project:${projectId}:leave`, { userId, userName })
      );
  }

  public chat(projectId: string, message: string): void {
    this.projectSockets
      .get(projectId)
      .forEach(userSocket =>
        userSocket.emit(`project:${projectId}:chat`, message)
      );
  }
}
