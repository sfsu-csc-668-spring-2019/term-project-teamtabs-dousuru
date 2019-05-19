import { Socket } from "socket.io";

export class OrganizationHandler {
  private static _instance: OrganizationHandler;
  private organizationSockets: Map<string, Map<string, Socket>>;
  private userSockets: Map<string, Socket>;
  private userOrganizations: Map<string, string[]>;

  private constructor(
    organizationSockets: Map<string, Map<string, Socket>>,
    userSockets: Map<string, Socket>,
    userOrganizations: Map<string, string[]>
  ) {
    if (OrganizationHandler._instance) {
      throw new Error(
        "Instantiation failed: use OrganizationHandler.getInstance() instead of new."
      );
    }
    this.organizationSockets = organizationSockets;
    this.userSockets = userSockets;
    this.userOrganizations = userOrganizations;
    this.join = this.join.bind(this);
    this.leave = this.leave.bind(this);
    this.chat = this.chat.bind(this);
    OrganizationHandler._instance = this;
  }

  public static initializeInstance(
    organizationSockets: Map<string, Map<string, Socket>>,
    userSockets: Map<string, Socket>,
    userOrganizations: Map<string, string[]>
  ): void {
    if (OrganizationHandler._instance) {
      throw new Error(
        "Instantiation failed: instance has already been initiated."
      );
    }
    new OrganizationHandler(
      organizationSockets,
      userSockets,
      userOrganizations
    );
  }

  public static getInstance(): OrganizationHandler {
    return OrganizationHandler._instance;
  }

  public join(organizationId: string, userId: string, username: string): void {
    if (undefined === this.organizationSockets.get(organizationId)) {
      this.organizationSockets.set(organizationId, new Map());
    }
    if (undefined === this.userOrganizations.get(userId)) {
      this.userOrganizations.set(userId, []);
    }
    this.organizationSockets
      .get(organizationId)
      .set(userId, this.userSockets.get(userId));
    if (!this.userOrganizations.get(userId).includes(organizationId)) {
      this.userOrganizations.get(userId).push(organizationId);
    }
    this.organizationSockets.get(organizationId).forEach(userSocket =>
      userSocket.emit(`organization:${organizationId}:join`, {
        userId,
        username
      })
    );
  }

  public leave(organizationId: string, userId: string, username: string): void {
    this.organizationSockets.get(organizationId).forEach(userSocket =>
      userSocket.emit(`organization:${organizationId}:leave`, {
        userId,
        username
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
  public update(organizationId: string, data: any): void {
    this.organizationSockets
      .get(organizationId)
      .forEach(userSocket =>
        userSocket.emit(`organization:${organizationId}:update`, data)
      );
  }
}
