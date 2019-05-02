import { Socket } from "socket.io";

export class TaskHandler {
  private static _instance: TaskHandler;
  private taskSockets: Map<string, Map<string, Socket>>;
  private userSockets: Map<string, Socket>;

  private constructor(
    taskSockets: Map<string, Map<string, Socket>>,
    userSockets: Map<string, Socket>
  ) {
    if (TaskHandler._instance) {
      throw new Error(
        "Instantiation failed: use TaskHandler.getInstance() instead of new."
      );
    }
    this.taskSockets = taskSockets;
    this.userSockets = userSockets;
    this.join = this.join.bind(this);
    this.leave = this.leave.bind(this);
    this.chat = this.chat.bind(this);
    TaskHandler._instance = this;
  }

  public static initializeInstance(
    taskSockets: Map<string, Map<string, Socket>>,
    userSockets: Map<string, Socket>
  ): void {
    if (TaskHandler._instance) {
      throw new Error(
        "Instantiation failed: instance has already been initiated."
      );
    }
    new TaskHandler(taskSockets, userSockets);
  }

  public static getInstance(): TaskHandler {
    return TaskHandler._instance;
  }

  public join(taskId: string, userId: string, userName: string): void {
    if (undefined === this.taskSockets.get(taskId)) {
      this.taskSockets.set(taskId, new Map());
    }
    this.taskSockets.get(taskId).set(userId, this.userSockets.get(userId));
    this.taskSockets
      .get(taskId)
      .forEach(userSocket =>
        userSocket.emit(`task:${taskId}:join`, { userId, userName })
      );
  }

  public leave(taskId: string, userId: string, userName: string): void {
    this.taskSockets
      .get(taskId)
      .forEach(userSocket =>
        userSocket.emit(`task:${taskId}:leave`, { userId, userName })
      );
  }

  public chat(taskId: string, message: string): void {
    this.taskSockets
      .get(taskId)
      .forEach(userSocket => userSocket.emit(`task:${taskId}:chat`, message));
  }
}
