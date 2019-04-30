import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Organization extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  organization_id: number;

  @Column()
  name : string;

  @Column()
  description : string;

  @Column()
  icon : string;

  @Column()
  user_id : number;
}
