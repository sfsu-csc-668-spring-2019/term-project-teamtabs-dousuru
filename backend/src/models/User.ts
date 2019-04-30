import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, UpdateDateColumn, ManyToMany } from "typeorm";
import { Organization } from "./Organization";
import { Project } from "./Project";
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 40, unique: true, nullable: false})
  userName: string

  @Column({ type: "varchar", length: 100, unique: true, nullable: false })
  password: string;

  @Column({ type: "varchar", unique: true, nullable: false})
  displayName: string;


  @Column({ type: "varchar", length: 200, unique: true })
  email: string;

  @Column({ type: "varchar", length: 2083 })
  icon: string;

  @OneToMany(type => Project, project => project.owner)
  ownedProjects: Project[];

  @ManyToMany( type => Project)
  projects: Project[];
}
