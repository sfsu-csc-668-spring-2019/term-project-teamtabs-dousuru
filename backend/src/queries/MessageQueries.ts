import {
  Message,
  User,
  MessagePartition,
  Organization,
  Project
} from "../entity";

export class MessageQueries {
  public static async createUserMessage(
    ownerId: number,
    receiverId: number,
    partitions: any[]
  ): Promise<Message> {
    let owner = await User.findOne(ownerId, { relations: ["contacts"] });
    let receiver = await User.findOne(receiverId, { relations: ["contacts"] });
    MessageQueries.RegisterContact(owner, receiver);
    MessageQueries.RegisterContact(receiver, owner);
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
    try {
      let owner = await User.findOne(ownerId);
      let baseProject = await Project.findOne(projectId);
      let messagePartitions = await Promise.all(
        partitions.map(partition =>
          MessagePartition.create({
            index: partition.index,
            associatedValue: partition.associatedValue,
            type: partition.type
          }).save()
        )
      );
      let message = await Message.create({
        owner,
        baseProject,
        messagePartitions
      });
      return await message.save();
    } catch (err) {
      console.error(err);
    }
  }

  public static async getProjectMessages(
    projectId: number
  ): Promise<Message[]> {
    try {
      let baseProject = await Project.findOne(projectId, {
        relations: ["projectMessages", "projectMessages.messagePartitions"]
      });
      console.log(baseProject);
      return baseProject.projectMessages;
    } catch (err) {
      console.error(err);
    }
  }

  public static async updateMessage(
    messageId: number,
    partitions: any[]
  ): Promise<Message> {
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
    return await message.save();
  }
}
