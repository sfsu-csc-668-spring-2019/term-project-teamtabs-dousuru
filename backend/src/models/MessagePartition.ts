import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany
} from "typeorm";
import { User } from "./User";
import { Project } from "./Project";
import { Organization } from "./Organization";
import { Task } from "./Task";

@Entity()
export class MessagePartition extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "integer", nullable: false })
  index: Date;

  @Column({ type: "varchar", nullable: false })
  displayedValue: string;

  @Column({ type: "varchar", nullable: false })
  type: string;

  @Column({ type: "varchar" })
  url: string;
}
