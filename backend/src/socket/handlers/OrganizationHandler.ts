import { Socket } from "socket.io";

export class OrganizationHandler {
  private static _instance: OrganizationHandler;
  private organizationSockets: Map<string, Map<string, Socket>>;
  private userSockets: Map<string, Socket>;

  private constructor(
    organizationSockets: Map<string, Map<string, Socket>>,
    userSockets: Map<string, Socket>
  ) {
    if (OrganizationHandler._instance) {
      throw new Error(
        "Instantiation failed: use OrganizationHandler.getInstance() instead of new."
      );
    }
    this.organizationSockets = organizationSockets;
    this.userSockets = userSockets;
    this.join = this.join.bind(this);
    this.leave = this.leave.bind(this);
    this.chat = this.chat.bind(this);
    OrganizationHandler._instance = this;
  }

  public static initializeInstance(
    organizationSockets: Map<string, Map<string, Socket>>,
    userSockets: Map<string, Socket>
  ): void {
    if (OrganizationHandler._instance) {
      throw new Error(
        "Instantiation failed: instance has already been initiated."
      );
    }
    new OrganizationHandler(organizationSockets, userSockets);
  }

  public static getInstance(): OrganizationHandler {
    return OrganizationHandler._instance;
  }

  public join(organizationId: string, userId: string, userName: string): void {
    if (undefined === this.organizationSockets.get(organizationId)) {
      this.organizationSockets.set(organizationId, new Map());
    }
    this.organizationSockets
      .get(organizationId)
      .set(userId, this.userSockets.get(userId));
    this.organizationSockets.get(organizationId).forEach(userSocket =>
      userSocket.emit(`organization:${organizationId}:join`, {
        userId,
        userName
      })
    );
  }

  public leave(organizationId: string, userId: string, userName: string): void {
    this.organizationSockets.get(organizationId).forEach(userSocket =>
      userSocket.emit(`organization:${organizationId}:leave`, {
        userId,
        userName
      })
    );
  }

  public chat(organizationId: string, message: string): void {
    this.organizationSockets
      .get(organizationId)
      .forEach(userSocket =>
        userSocket.emit(`organization:${organizationId}:chat`, message)
      );
  }
}
