import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 60,
    nullable: false
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 5000,
    nullable: false
  })
  description: string;

  @Column({ type: 'date', nullable: false })
  startTime: Date;

  @Column({ type: 'date' })
  endTime: Date;

  @Column({ type: 'date' })
  dueTime: Date;
}
