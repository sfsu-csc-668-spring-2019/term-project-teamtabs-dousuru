import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable
} from "typeorm";
import { Organization } from "./Organization";
import { Project } from "./Project";
import { List } from "./List";
import { Message } from "./Message";
import { Role } from "./Role";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 40, unique: true, nullable: false })
  userName: string;

  @Column({ type: "varchar", length: 100, unique: false, nullable: false })
  password: string;

  @Column({ type: "varchar", length: 200, unique: true, nullable: false })
  email: string;

  @Column({ type: "varchar", length: 2083, nullable: true, unique: false })
  icon: string;

  @ManyToMany(type => User, user => user.contacts)
  @JoinTable()
  contacts: User[];

  @OneToMany(type => Project, orgnanization => orgnanization.owner)
  ownedOrganizations: Organization[];

  @OneToMany(type => Project, project => project.owner)
  ownedProjects: Project[];

  @ManyToMany(type => Organization, organization => organization.users)
  organizations: Organization[];

  @ManyToMany(type => Project, project => project.users)
  projects: Project[];

  @OneToMany(type => Message, message => message.owner)
  ownedMessages: Message[];

  @ManyToMany(type => Message, message => message.receiver)
  receivedMessages: Message[];

  @ManyToMany(type => Role, role => role.users)
  @JoinTable()
  roles: Role[];
}
