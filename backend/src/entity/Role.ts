import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne
} from "typeorm";
import { Organization } from "./Organization";
import { Project } from "./Project";

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 40, nullable: false })
  name: string;

  @ManyToOne(type => Organization, organization => organization.roles, {onDelete: "CASCADE"})
  organization: Organization;

  @ManyToOne(type => Project, project => project.roles, {onDelete: "CASCADE"})
  project: Project;

  @Column({ type: "boolean", nullable: false })
  canInvite: boolean;

  @Column({ type: "boolean", nullable: false })
  canManage: boolean;

  @Column({ type: "boolean", nullable: false })
  canPost: boolean;
}
