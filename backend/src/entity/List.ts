import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { Project } from "./Project";
import { Task } from "./Task";
@Entity()
export class List extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 60, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 5000, nullable: true })
  description: string;

  @ManyToOne(type => Project, project => project.containedLists, {
    onDelete: "CASCADE"
  })
  baseProject: Project;

  @OneToMany(type => Task, task => task.baseList)
  containedTasks: Task[];
}
