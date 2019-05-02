import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

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

  @Column({ type: "varchar", nullable: true })
  url: string;
}
