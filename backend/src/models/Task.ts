import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import {List} from "./List";

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 60, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 5000 })
  description: string;

  @ManyToOne(type => List, list => list.containedTasks)
  baseList: List
}
