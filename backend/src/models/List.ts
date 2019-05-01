import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { User } from "./User";
import { Project } from "./Project";
import { Task } from "./Task";
@Entity()
export class List extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 60, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 5000 })
  description: string;

  @ManyToOne(type => Project, project => project.containedLists)
  baseProject: Project

  @OneToMany(type => Task, task => task.baseList)
  containedTasks: Task[]
}

