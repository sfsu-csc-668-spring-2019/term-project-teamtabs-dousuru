import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany
} from "typeorm";
import { User } from "./User";
import { Project } from "./Project";
import { Organization } from "./Organization";
import { MessagePartition } from "./MessagePartition";

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "timestamp", nullable: false })
  timeCreated: Date;

  @Column({ type: "timestamp", nullable: false })
  timeUpdated: Date;

  @ManyToOne(type => User, user => user.ownedMessages)
  owner: User;

  @ManyToOne(type => Project, project => project.projectMessages, {onDelete: "CASCADE"})
  baseProject: Project;

  @ManyToOne(type => Organization, organization => organization.organizationMessages, {onDelete: "CASCADE"})
  baseOrganization: Organization;

  @ManyToOne(type => User, user => user.sentMessages)
  sender: User;

  @ManyToOne(type => User, user => user.receivedMessages)
  receiver: User;

  @OneToMany(type => MessagePartition, messagePartition => messagePartition.baseMessage)
  messagePartitions: MessagePartition[]
}
