import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  isPublic: boolean;

  @ManyToOne(type => User, user => user.projects)
  user: User;
}
