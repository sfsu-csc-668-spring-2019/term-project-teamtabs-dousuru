import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";
import { Project } from "./Project";
@Entity()
export class List extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 60, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 5000 })
  description: string;

  @ManyToOne(type => User, user => user.ownedLists)
  owner: User;

  @ManyToMany( type => User)
  @JoinTable()
  users: User[];

  @ManyToOne(type => Project, project => project.containedLists)
  baseProject: Project
}

