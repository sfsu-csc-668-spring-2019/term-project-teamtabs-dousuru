import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne
} from "typeorm";
import { User } from "./User";
import { Project } from "./Project";
import { Organization } from "./Organization";

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

  @ManyToOne(type => Project, project => project.projectMessages)
  baseProject: Project;

  @ManyToOne(
    type => Organization,
    organization => organization.organizationMessages
  )
  baseOrganization: Organization;

  @ManyToOne(type => User, user => user.sentMessages)
  sender: User;

  @ManyToOne(type => User, user => user.receivedMessages)
  receiver: User;
}
