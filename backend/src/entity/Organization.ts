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
import { Role } from "./Role";
import { Message } from "./Message";

@Entity()
export class Organization extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 60, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 5000, nullable: true })
  description: string;

  @Column({ type: "varchar", length: 2083, nullable: true })
  icon: string;

  @ManyToOne(type => User, user => user.ownedOrganizations)
  owner: User;

  @ManyToMany(type => User, user => user.organizations, { onDelete: "CASCADE" })
  @JoinTable()
  users: User[];

  @OneToMany(type => Project, project => project.baseOrganization)
  containedProjects: Project[];

  @OneToMany(type => Role, role => role.organization)
  roles: Role[];

  @OneToMany(type => Message, message => message.baseOrganization)
  organizationMessages: Message[];
}
