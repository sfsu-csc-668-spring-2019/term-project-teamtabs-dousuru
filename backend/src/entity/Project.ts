import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
  JoinTable
} from "typeorm";
import { User } from "./User";
import { Organization } from "./Organization";
import { List } from "./List";
import { Role } from "./Role";
import { Message } from "./Message";
import { Tag } from "./Tag";

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 60, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 5000, nullable: true })
  description: string;

  @Column({ type: "boolean", nullable: false })
  isPublic: boolean;

  @ManyToOne(type => User, user => user.ownedProjects)
  owner: User;

  @ManyToMany(type => User, user => user.ownedProjects, { onDelete: "CASCADE" })
  @JoinTable()
  users: User[];

  @ManyToOne(
    type => Organization,
    organization => organization.containedProjects,
    { onDelete: "CASCADE" }
  )
  baseOrganization: Organization;

  @OneToMany(type => List, list => list.baseProject)
  containedLists: List[];

  @OneToMany(type => Role, role => role.project)
  roles: Role[];

  @ManyToMany(type => Message, message => message.baseProject)
  projectMessages: Message[];

  @OneToMany(type => Tag, tag => tag.baseProject)
  tags: Tag[];
}
