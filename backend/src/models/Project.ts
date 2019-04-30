import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 60, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 5000 })
  description: string;

  @Column({ type: "boolean", nullable: false })
  isPublic: boolean;

  @ManyToOne(type => User, user => user.ownedProjects)
  owner: User;

  @ManyToMany( type => User)
  @JoinTable()
  users: User[];
}
