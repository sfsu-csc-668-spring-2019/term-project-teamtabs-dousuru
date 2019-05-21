import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne
} from "typeorm";
import { Task } from "./Task";
import { Project } from "./Project";

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 40,
    nullable: false
  })
  name: string;

  @Column({
    type: "varchar",
    length: 6,
    nullable: false
  })
  color: string;

  @ManyToOne(type => Project, project => project.tags, { onDelete: "CASCADE" })
  baseProject: Project;

  @ManyToMany(type => Task, task => task.tags, { onDelete: "CASCADE" })
  @JoinTable()
  tasks: Task[];
}
