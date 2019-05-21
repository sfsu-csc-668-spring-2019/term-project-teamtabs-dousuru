import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinTable,
  ManyToMany
} from "typeorm";
import { User } from "./User";
import { Project } from "./Project";
import { Organization } from "./Organization";
import { MessagePartition } from "./MessagePartition";

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(type => User, user => user.ownedMessages)
  owner: User;

  @ManyToOne(type => Project, project => project.projectMessages, {
    onDelete: "CASCADE"
  })
  baseProject: Project;

  @ManyToMany(
    type => Organization,
    organization => organization.organizationMessages,
    { onDelete: "CASCADE" }
  )
  @JoinTable()
  baseOrganization: Organization;

  @ManyToMany(type => User, user => user.receivedMessages)
  @JoinTable()
  receiver: User;

  @OneToMany(
    type => MessagePartition,
    messagePartition => messagePartition.baseMessage
  )
  messagePartitions: MessagePartition[];
}
