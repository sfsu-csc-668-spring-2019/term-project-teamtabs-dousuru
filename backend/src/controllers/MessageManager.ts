import {
  Message,
  User,
  MessagePartition,
  Organization,
  Project
} from "../entity";

export class MessageManager {
  public static async createUserMessage(
    ownerId: number,
    receiverId: number,
    partitions: any[]
  ): Promise<Message> {
    let timeCreated = new Date();
    let owner = await User.findOne(ownerId, { relations: ["contacts"] });
    let receiver = await User.findOne(receiverId, { relations: ["contacts"] });
    MessageManager.RegisterContact(owner, receiver);
    MessageManager.RegisterContact(receiver, owner);
    let messagePartitions = await Promise.all(
      partitions.map(partition =>
        MessagePartition.create({
          index: partition.index,
          associatedValue: partition.associatedValue,
          type: partition.type
        })
      )
    );
    await Promise.all(
      messagePartitions.map(messagePartition => messagePartition.save())
    );
    let message = await Message.create({
      timeCreated,
      owner,
      receiver,
      messagePartitions
    });
    return await message.save();
  }

  private static async RegisterContact(
    user1: User,
    user2: User
  ): Promise<void> {
    if (undefined === user1.contacts) {
      user1.contacts = [user2];
      await user1.save();
    } else if (!user1.contacts.includes(user2)) {
      user1.contacts.push(user2);
      await user1.save();
    }
  }

  public static async getUserMessages(
    ownerId: number,
    receiverId: number
  ): Promise<Message[]> {
    let owner = User.findOne(ownerId);
    let receiver = User.findOne(receiverId);
    return await Message.find({
      where: [{ owner, receiver }, { owner: receiver, receiver: owner }]
    });
  }

  public static async createOrganizationMessage(
    ownerId: number,
    organizationId: number,
    partitions: any[]
  ): Promise<Message> {
    let timeCreated = new Date();
    let owner = await User.findOne(ownerId);
    let baseOrganization = await Organization.findOne(organizationId);
    let messagePartitions = await Promise.all(
      partitions.map(partition =>
        MessagePartition.create({
          index: partition.index,
          associatedValue: partition.associatedValue,
          type: partition.type
        })
      )
    );
    await Promise.all(
      messagePartitions.map(messagePartition => messagePartition.save())
    );
    let message = await Message.create({
      timeCreated,
      owner,
      baseOrganization,
      messagePartitions
    });
    return await message.save();
  }

  public static async getOrganizationMessages(
    organizationId: number
  ): Promise<Message[]> {
    let baseOrganization = await Organization.findOne(organizationId);
    return await Message.find({ where: { baseOrganization } });
  }

  public static async createProjectMessage(
    ownerId: number,
    projectId: number,
    partitions: any[]
  ): Promise<Message> {
    let timeCreated = new Date();
    let owner = await User.findOne(ownerId);
    let baseProject = await Project.findOne(projectId);
    let messagePartitions = await Promise.all(
      partitions.map(partition =>
        MessagePartition.create({
          index: partition.index,
          associatedValue: partition.associatedValue,
          type: partition.type
        })
      )
    );
    await Promise.all(
      messagePartitions.map(messagePartition => messagePartition.save())
    );
    let message = await Message.create({
      timeCreated,
      owner,
      baseProject,
      messagePartitions
    });
    return await message.save();
  }

  public static async getProjectMessages(
    projectId: number
  ): Promise<Message[]> {
    let baseProject = await Project.findOne(projectId);
    return await Message.find({ where: { baseProject } });
  }

  public static async updateMessage(
    messageId: number,
    partitions: any[]
  ): Promise<Message> {
    let timeUpdated = new Date();
    let messagePartitions = await Promise.all(
      partitions.map(partition =>
        MessagePartition.create({
          index: partition.index,
          associatedValue: partition.associatedValue,
          type: partition.type
        })
      )
    );
    await Promise.all(
      messagePartitions.map(messagePartition => messagePartition.save())
    );
    let message = await Message.findOne(messageId);
    await Promise.all(
      message.messagePartitions.map(messagePartition =>
        MessagePartition.delete(messagePartition.id)
      )
    );
    message.messagePartitions = messagePartitions;
    message.timeUpdated = timeUpdated;
    return await message.save();
  }
}
