import { Socket } from "socket.io";

export class TaskHandler {
  private static _instance: TaskHandler;
  private taskSockets: Map<string, Map<string, Socket>>;
  private userSockets: Map<string, Socket>;
  private userTasks: Map<string, string[]>;

  private constructor(userSockets: Map<string, Socket>) {
    if (TaskHandler._instance) {
      throw new Error(
        "Instantiation failed: use TaskHandler.getInstance() instead of new."
      );
    }
    this.taskSockets = new Map();
    this.userTasks = new Map();
    this.userSockets = userSockets;
    this.join = this.join.bind(this);
    this.leave = this.leave.bind(this);
    this.chat = this.chat.bind(this);
    TaskHandler._instance = this;
  }

  public static initializeInstance(userSockets: Map<string, Socket>): void {
    if (TaskHandler._instance) {
      throw new Error(
        "Instantiation failed: instance has already been initiated."
      );
    }
    new TaskHandler(userSockets);
  }

  public static getInstance(): TaskHandler {
    return TaskHandler._instance;
  }

  public join(taskId: string, userId: string, username: string): void {
    if (undefined === this.userSockets.get(userId)) {
      return;
    }
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

  public disconnect(userId: string): void {
    const tasks = this.userTasks.get(userId);
    if (tasks) {
      tasks.map(taskId => this.taskSockets.get(taskId).delete(userId));
    }
    this.userTasks.delete(userId);
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
