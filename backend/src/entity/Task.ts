import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { List } from "./List";
import { Tag } from "./Tag";
import { Message } from "./Message";

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 60, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 5000 })
  description: string;

  @Column({ type: "timestamp" })
  startTime: Date;

  @Column({ type: "timestamp" })
  endTime: Date;

  @Column({ type: "timestamp" })
  dueDate: Date;

  @ManyToOne(type => List, list => list.containedTasks)
  baseList: List;

  @OneToMany(type => Tag, tag => tag.baseTask)
  containedTags: Tag[];
}
