import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { User } from "./User";
import { Project } from "./Project";
import { Message } from "./Message";

@Entity()
export class Organization extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 60, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 5000 })
  description: string;

  @Column({ type: "varchar", length: 2083})
  icon: string;

  @ManyToOne(type => User, user => user.ownedOrganizations)
  owner: User;

  @ManyToMany( type => User)
  @JoinTable()
  users: User[];

  @OneToMany(type => Project, project => project.baseOrganization)
  containedProjects: Project[]

  @OneToMany(type => Message, message => message.baseOrganization)
  organizationMessages: Message[]
}
