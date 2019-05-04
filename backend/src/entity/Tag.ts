import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable
} from "typeorm";
import { Task } from "./Task";

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

  @ManyToMany(type => Task, task => task.tags, { onDelete: "CASCADE" })
  @JoinTable()
  tasks: Task[];
}
