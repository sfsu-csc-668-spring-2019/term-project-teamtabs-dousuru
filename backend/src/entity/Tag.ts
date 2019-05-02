import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Task } from "./Task";

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 40,
    nullable: false
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 6,
    nullable: false
  })
  color: string;

  @ManyToOne(type => Task, task => task.containedTags)
  baseTask: Task;
}