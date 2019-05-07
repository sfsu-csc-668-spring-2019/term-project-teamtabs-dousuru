import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne
} from "typeorm";
import { Message } from "./Message";

@Entity()
export class MessagePartition extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "integer", nullable: false })
  index: number;

  @Column({ type: "varchar", nullable: false })
  associatedValue: string;

  @Column({ type: "varchar", nullable: true })
  textValue: string;

  @Column({ type: "varchar", nullable: false })
  type: string;

  @ManyToOne(type => Message, message => message.messagePartitions)
  baseMessage: Message;
}
