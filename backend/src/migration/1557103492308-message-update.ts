import { MigrationInterface, QueryRunner } from "typeorm";

export class messageUpdate1557103492308 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "tag" DROP CONSTRAINT "FK_adb5c1c902da883288b6dcb023f"`
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_79308bc7b73d3190a973655411d"`
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_44c188867ace9f8347f11d3b7e5"`
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_bc096b4e18b1f9508197cd98066"`
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_71fb36906595c602056d936fc13"`
    );
    await queryRunner.query(
      `ALTER TABLE "tag" RENAME COLUMN "baseTaskId" TO "basedProjectId"`
    );
    await queryRunner.query(
      `CREATE TABLE "tag_tasks_task" ("tagId" integer NOT NULL, "taskId" integer NOT NULL, CONSTRAINT "PK_e7a04a89e140144aa0671b8bc93" PRIMARY KEY ("tagId", "taskId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_be20f0c1e7e30bb94f9a5e6ea0" ON "tag_tasks_task" ("tagId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cb23339752b2584d26ca54ea66" ON "tag_tasks_task" ("taskId") `
    );
    await queryRunner.query(
      `CREATE TABLE "message_base_project_project" ("messageId" integer NOT NULL, "projectId" integer NOT NULL, CONSTRAINT "PK_c49a29e8fd1fa8477fdeb9a6a56" PRIMARY KEY ("messageId", "projectId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7867671e7b93dceb89446418e0" ON "message_base_project_project" ("messageId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_56c3b129d6a1fd8ec4ded57d50" ON "message_base_project_project" ("projectId") `
    );
    await queryRunner.query(
      `CREATE TABLE "message_base_organization_organization" ("messageId" integer NOT NULL, "organizationId" integer NOT NULL, CONSTRAINT "PK_a956fe2f24604578f71e2f60015" PRIMARY KEY ("messageId", "organizationId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6418e8a3dc73282910c332f473" ON "message_base_organization_organization" ("messageId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9d46360af1b9b391d716860120" ON "message_base_organization_organization" ("organizationId") `
    );
    await queryRunner.query(
      `CREATE TABLE "message_receiver_user" ("messageId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_50cca04658047b88f59546846eb" PRIMARY KEY ("messageId", "userId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b84a1cf47f967404a324f1d863" ON "message_receiver_user" ("messageId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1604d2b63c87a3569ad9b559a9" ON "message_receiver_user" ("userId") `
    );
    await queryRunner.query(
      `CREATE TABLE "user_roles_role" ("userId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_b47cd6c84ee205ac5a713718292" PRIMARY KEY ("userId", "roleId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5f9286e6c25594c6b88c108db7" ON "user_roles_role" ("userId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4be2f7adf862634f5f803d246b" ON "user_roles_role" ("roleId") `
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP COLUMN "baseProjectId"`
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP COLUMN "baseOrganizationId"`
    );
    await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "senderId"`);
    await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "receiverId"`);
    await queryRunner.query(
      `ALTER TABLE "tag" ADD CONSTRAINT "FK_2bedba89931aa62658c5ac067ee" FOREIGN KEY ("basedProjectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "tag_tasks_task" ADD CONSTRAINT "FK_be20f0c1e7e30bb94f9a5e6ea09" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "tag_tasks_task" ADD CONSTRAINT "FK_cb23339752b2584d26ca54ea66c" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "message_base_project_project" ADD CONSTRAINT "FK_7867671e7b93dceb89446418e0a" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "message_base_project_project" ADD CONSTRAINT "FK_56c3b129d6a1fd8ec4ded57d505" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "message_base_organization_organization" ADD CONSTRAINT "FK_6418e8a3dc73282910c332f4739" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "message_base_organization_organization" ADD CONSTRAINT "FK_9d46360af1b9b391d716860120d" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "message_receiver_user" ADD CONSTRAINT "FK_b84a1cf47f967404a324f1d863e" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "message_receiver_user" ADD CONSTRAINT "FK_1604d2b63c87a3569ad9b559a94" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_5f9286e6c25594c6b88c108db77" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_4be2f7adf862634f5f803d246b8" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_4be2f7adf862634f5f803d246b8"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_5f9286e6c25594c6b88c108db77"`
    );
    await queryRunner.query(
      `ALTER TABLE "message_receiver_user" DROP CONSTRAINT "FK_1604d2b63c87a3569ad9b559a94"`
    );
    await queryRunner.query(
      `ALTER TABLE "message_receiver_user" DROP CONSTRAINT "FK_b84a1cf47f967404a324f1d863e"`
    );
    await queryRunner.query(
      `ALTER TABLE "message_base_organization_organization" DROP CONSTRAINT "FK_9d46360af1b9b391d716860120d"`
    );
    await queryRunner.query(
      `ALTER TABLE "message_base_organization_organization" DROP CONSTRAINT "FK_6418e8a3dc73282910c332f4739"`
    );
    await queryRunner.query(
      `ALTER TABLE "message_base_project_project" DROP CONSTRAINT "FK_56c3b129d6a1fd8ec4ded57d505"`
    );
    await queryRunner.query(
      `ALTER TABLE "message_base_project_project" DROP CONSTRAINT "FK_7867671e7b93dceb89446418e0a"`
    );
    await queryRunner.query(
      `ALTER TABLE "tag_tasks_task" DROP CONSTRAINT "FK_cb23339752b2584d26ca54ea66c"`
    );
    await queryRunner.query(
      `ALTER TABLE "tag_tasks_task" DROP CONSTRAINT "FK_be20f0c1e7e30bb94f9a5e6ea09"`
    );
    await queryRunner.query(
      `ALTER TABLE "tag" DROP CONSTRAINT "FK_2bedba89931aa62658c5ac067ee"`
    );
    await queryRunner.query(`ALTER TABLE "message" ADD "receiverId" integer`);
    await queryRunner.query(`ALTER TABLE "message" ADD "senderId" integer`);
    await queryRunner.query(
      `ALTER TABLE "message" ADD "baseOrganizationId" integer`
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD "baseProjectId" integer`
    );
    await queryRunner.query(`DROP INDEX "IDX_4be2f7adf862634f5f803d246b"`);
    await queryRunner.query(`DROP INDEX "IDX_5f9286e6c25594c6b88c108db7"`);
    await queryRunner.query(`DROP TABLE "user_roles_role"`);
    await queryRunner.query(`DROP INDEX "IDX_1604d2b63c87a3569ad9b559a9"`);
    await queryRunner.query(`DROP INDEX "IDX_b84a1cf47f967404a324f1d863"`);
    await queryRunner.query(`DROP TABLE "message_receiver_user"`);
    await queryRunner.query(`DROP INDEX "IDX_9d46360af1b9b391d716860120"`);
    await queryRunner.query(`DROP INDEX "IDX_6418e8a3dc73282910c332f473"`);
    await queryRunner.query(
      `DROP TABLE "message_base_organization_organization"`
    );
    await queryRunner.query(`DROP INDEX "IDX_56c3b129d6a1fd8ec4ded57d50"`);
    await queryRunner.query(`DROP INDEX "IDX_7867671e7b93dceb89446418e0"`);
    await queryRunner.query(`DROP TABLE "message_base_project_project"`);
    await queryRunner.query(`DROP INDEX "IDX_cb23339752b2584d26ca54ea66"`);
    await queryRunner.query(`DROP INDEX "IDX_be20f0c1e7e30bb94f9a5e6ea0"`);
    await queryRunner.query(`DROP TABLE "tag_tasks_task"`);
    await queryRunner.query(
      `ALTER TABLE "tag" RENAME COLUMN "basedProjectId" TO "baseTaskId"`
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_71fb36906595c602056d936fc13" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_bc096b4e18b1f9508197cd98066" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_44c188867ace9f8347f11d3b7e5" FOREIGN KEY ("baseOrganizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_79308bc7b73d3190a973655411d" FOREIGN KEY ("baseProjectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "tag" ADD CONSTRAINT "FK_adb5c1c902da883288b6dcb023f" FOREIGN KEY ("baseTaskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }
}
