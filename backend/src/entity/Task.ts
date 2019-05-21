import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany
} from "typeorm";
import { List } from "./List";
import { Tag } from "./Tag";

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 60, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 5000, nullable: true })
  description: string;

  @Column({ type: "time", nullable: true, default: () => `now()` })
  startTime: Date;

  @Column({ type: "time", nullable: true })
  endTime: Date;

  @Column({ type: "time", nullable: true })
  dueDate: Date;

  @ManyToOne(type => List, list => list.containedTasks, { onDelete: "CASCADE" })
  baseList: List;

  @ManyToMany(type => Tag, tag => tag.tasks, { onDelete: "CASCADE" })
  tags: Tag[];
}
