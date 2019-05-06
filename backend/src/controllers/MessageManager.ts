import {
  Message,
  User,
  MessagePartition,
  Organization,
  Project
} from "../entity";

export class MessageManager {
  public static async createUserMessage(
    senderId: number,
    receiverId: number,
    partitions: any[]
  ): Promise<Message> {
    let timeCreated = new Date();
    let sender = await User.findOne(senderId);
    let receiver = await User.findOne(receiverId);
    let messagePartitions = await Promise.all(
      partitions.map(partition =>
        MessagePartition.create({
          index: partition.index,
          displayedValue: partition.displayedValue,
          type: partition.type,
          url: partition.url
        })
      )
    );
    await Promise.all(
      messagePartitions.map(messagePartition => messagePartition.save())
    );
    let message = await Message.create({
      timeCreated,
      sender,
      receiver,
      messagePartitions
    });
    return await message.save();
  }

  public static async getUserMessage(
    senderId: number,
    receiverId: number
  ): Promise<Message[]> {
    let sender = User.findOne(senderId);
    let receiver = User.findOne(receiverId);
    return await Message.find({ where: { sender, receiver } });
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
          displayedValue: partition.displayedValue,
          type: partition.type,
          url: partition.url
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

  public static async getOrganizationMessage(
    ownerId: number,
    organizationId: number
  ): Promise<Message[]> {
    let owner = await User.findOne(ownerId);
    let baseOrganization = await Organization.findOne(organizationId);
    return await Message.find({ where: { owner, baseOrganization } });
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
          displayedValue: partition.displayedValue,
          type: partition.type,
          url: partition.url
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

  public static async getProjectMessage(
    ownerId: number,
    projectId: number
  ): Promise<Message[]> {
    let owner = await User.findOne(ownerId);
    let baseProject = await Project.findOne(projectId);
    return await Message.find({ where: { owner, baseProject } });
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
          displayedValue: partition.displayedValue,
          type: partition.type,
          url: partition.url
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
