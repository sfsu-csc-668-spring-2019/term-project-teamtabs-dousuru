import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
