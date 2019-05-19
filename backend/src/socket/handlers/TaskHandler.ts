import { Socket } from "socket.io";

export class TaskHandler {
  private static _instance: TaskHandler;
  private taskSockets: Map<string, Map<string, Socket>>;
  private userSockets: Map<string, Socket>;
  private userTasks: Map<string, string[]>;

  private constructor(
    taskSockets: Map<string, Map<string, Socket>>,
    userSockets: Map<string, Socket>,
    userTasks: Map<string, string[]>
  ) {
    if (TaskHandler._instance) {
      throw new Error(
        "Instantiation failed: use TaskHandler.getInstance() instead of new."
      );
    }
    this.taskSockets = taskSockets;
    this.userSockets = userSockets;
    this.userTasks = userTasks;
    this.join = this.join.bind(this);
    this.leave = this.leave.bind(this);
    this.chat = this.chat.bind(this);
    TaskHandler._instance = this;
  }

  public static initializeInstance(
    taskSockets: Map<string, Map<string, Socket>>,
    userSockets: Map<string, Socket>,
    userTasks: Map<string, string[]>
  ): void {
    if (TaskHandler._instance) {
      throw new Error(
        "Instantiation failed: instance has already been initiated."
      );
    }
    new TaskHandler(taskSockets, userSockets, userTasks);
  }

  public static getInstance(): TaskHandler {
    return TaskHandler._instance;
  }

  public join(taskId: string, userId: string, username: string): void {
    if (undefined === this.taskSockets.get(taskId)) {
      this.taskSockets.set(taskId, new Map());
    }
    if (undefined === this.userTasks.get(userId)) {
      this.userTasks.set(userId, []);
    }
    this.taskSockets.get(taskId).set(userId, this.userSockets.get(userId));
    if (!this.userTasks.get(userId).includes(taskId)) {
      this.userTasks.get(userId).push(taskId);
    }
    this.taskSockets
      .get(taskId)
      .forEach(userSocket =>
        userSocket.emit(`task:${taskId}:join`, { userId, username })
      );
  }

  public leave(taskId: string, userId: string, username: string): void {
    this.taskSockets
      .get(taskId)
      .forEach(userSocket =>
        userSocket.emit(`task:${taskId}:leave`, { userId, username })
      );
  }

  public chat(taskId: string, message: any): void {
    this.taskSockets
      .get(taskId)
      .forEach(userSocket => userSocket.emit(`task:${taskId}:chat`, message));
  }

  public update(taskId: string, data: any): void {
    this.taskSockets
      .get(taskId)
      .forEach(userSocket => userSocket.emit(`task:${taskId}:update`, data));
  }
}
