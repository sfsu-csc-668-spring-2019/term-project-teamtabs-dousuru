import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany
} from "typeorm";
import { Organization } from "./Organization";
import { Project } from "./Project";
import { User } from "./User";

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 40, nullable: false })
  name: string;

  @Column({ type: "boolean", nullable: false })
  canInvite: boolean;

  @Column({ type: "boolean", nullable: false })
  canManage: boolean;

  @Column({ type: "boolean", nullable: false })
  canPost: boolean;

  @ManyToOne(type => Organization, organization => organization.roles, {
    onDelete: "CASCADE",
    nullable: true
  })
  organization: Organization;

  @ManyToOne(type => Project, project => project.roles, {
    onDelete: "CASCADE",
    nullable: true
  })
  project: Project;

  @ManyToMany(type => User, user => user.roles, {
    onDelete: "CASCADE"
  })
  users: User[];
}
