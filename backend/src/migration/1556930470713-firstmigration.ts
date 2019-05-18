import { MigrationInterface, QueryRunner } from "typeorm";

export class firstmigration1556930470713 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying(40) NOT NULL, "color" character varying(6) NOT NULL, "baseTaskId" integer, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "task" ("id" SERIAL NOT NULL, "name" character varying(60) NOT NULL, "description" character varying(5000), "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP, "dueDate" TIMESTAMP, "baseListId" integer, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "list" ("id" SERIAL NOT NULL, "name" character varying(60) NOT NULL, "description" character varying(5000), "baseProjectId" integer, CONSTRAINT "PK_d8feafd203525d5f9c37b3ed3b9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying(40) NOT NULL, "canInvite" boolean NOT NULL, "canManage" boolean NOT NULL, "canPost" boolean NOT NULL, "organizationId" integer, "projectId" integer, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "message_partition" ("id" SERIAL NOT NULL, "index" integer NOT NULL, "displayedValue" character varying NOT NULL, "type" character varying NOT NULL, "url" character varying, "baseMessageId" integer, CONSTRAINT "PK_e9a5e545abf46c3778bf4dacd39" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "message" ("id" SERIAL NOT NULL, "timeCreated" TIMESTAMP NOT NULL, "timeUpdated" TIMESTAMP NOT NULL, "ownerId" integer, "baseProjectId" integer, "baseOrganizationId" integer, "senderId" integer, "receiverId" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying(60) NOT NULL, "description" character varying(5000), "isPublic" boolean NOT NULL, "ownerId" integer, "baseOrganizationId" integer, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "organization" ("id" SERIAL NOT NULL, "name" character varying(60) NOT NULL, "description" character varying(5000), "icon" character varying(2083), "ownerId" integer, CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "userName" character varying(40) NOT NULL, "password" character varying(100) NOT NULL, "displayName" character varying NOT NULL, "email" character varying(200) NOT NULL, "icon" character varying(2083), CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "project_users_user" ("projectId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_198c78e84c3bcdb0dc182e6d1e0" PRIMARY KEY ("projectId", "userId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9666c6dcd769c698bed4aa4bf5" ON "project_users_user" ("projectId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f8300efd87679e1e21532be980" ON "project_users_user" ("userId") `
    );
    await queryRunner.query(
      `CREATE TABLE "organization_users_user" ("organizationId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_a0057ab2ced35777f00eaaa9673" PRIMARY KEY ("organizationId", "userId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e1e28e472b43bbad7ff3cecdcd" ON "organization_users_user" ("organizationId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a02d820429038dce37d18f74b6" ON "organization_users_user" ("userId") `
    );
    await queryRunner.query(
      `ALTER TABLE "tag" ADD CONSTRAINT "FK_adb5c1c902da883288b6dcb023f" FOREIGN KEY ("baseTaskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_941bf6d26ce243880b69b0fd3b3" FOREIGN KEY ("baseListId") REFERENCES "list"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "list" ADD CONSTRAINT "FK_eb435281befdcd4395e3106b44f" FOREIGN KEY ("baseProjectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "role" ADD CONSTRAINT "FK_2bcd50772082305f3bcee6b6da4" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "role" ADD CONSTRAINT "FK_a1fb224502f5f78de30c7af7888" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "message_partition" ADD CONSTRAINT "FK_813adf7d2edaedd50fee26088c2" FOREIGN KEY ("baseMessageId") REFERENCES "message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_836fc46066e757709c46e99434e" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_79308bc7b73d3190a973655411d" FOREIGN KEY ("baseProjectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_44c188867ace9f8347f11d3b7e5" FOREIGN KEY ("baseOrganizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_bc096b4e18b1f9508197cd98066" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_71fb36906595c602056d936fc13" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_9884b2ee80eb70b7db4f12e8aed" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_3dbcf27d6bb07da664c28231460" FOREIGN KEY ("baseOrganizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "organization" ADD CONSTRAINT "FK_67c515257c7a4bc221bb1857a39" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "project_users_user" ADD CONSTRAINT "FK_9666c6dcd769c698bed4aa4bf55" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "project_users_user" ADD CONSTRAINT "FK_f8300efd87679e1e21532be9808" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "organization_users_user" ADD CONSTRAINT "FK_e1e28e472b43bbad7ff3cecdcdd" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "organization_users_user" ADD CONSTRAINT "FK_a02d820429038dce37d18f74b68" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "organization_users_user" DROP CONSTRAINT "FK_a02d820429038dce37d18f74b68"`
    );
    await queryRunner.query(
      `ALTER TABLE "organization_users_user" DROP CONSTRAINT "FK_e1e28e472b43bbad7ff3cecdcdd"`
    );
    await queryRunner.query(
      `ALTER TABLE "project_users_user" DROP CONSTRAINT "FK_f8300efd87679e1e21532be9808"`
    );
    await queryRunner.query(
      `ALTER TABLE "project_users_user" DROP CONSTRAINT "FK_9666c6dcd769c698bed4aa4bf55"`
    );
    await queryRunner.query(
      `ALTER TABLE "organization" DROP CONSTRAINT "FK_67c515257c7a4bc221bb1857a39"`
    );
    await queryRunner.query(
      `ALTER TABLE "project" DROP CONSTRAINT "FK_3dbcf27d6bb07da664c28231460"`
    );
    await queryRunner.query(
      `ALTER TABLE "project" DROP CONSTRAINT "FK_9884b2ee80eb70b7db4f12e8aed"`
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_71fb36906595c602056d936fc13"`
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_bc096b4e18b1f9508197cd98066"`
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_44c188867ace9f8347f11d3b7e5"`
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_79308bc7b73d3190a973655411d"`
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_836fc46066e757709c46e99434e"`
    );
    await queryRunner.query(
      `ALTER TABLE "message_partition" DROP CONSTRAINT "FK_813adf7d2edaedd50fee26088c2"`
    );
    await queryRunner.query(
      `ALTER TABLE "role" DROP CONSTRAINT "FK_a1fb224502f5f78de30c7af7888"`
    );
    await queryRunner.query(
      `ALTER TABLE "role" DROP CONSTRAINT "FK_2bcd50772082305f3bcee6b6da4"`
    );
    await queryRunner.query(
      `ALTER TABLE "list" DROP CONSTRAINT "FK_eb435281befdcd4395e3106b44f"`
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_941bf6d26ce243880b69b0fd3b3"`
    );
    await queryRunner.query(
      `ALTER TABLE "tag" DROP CONSTRAINT "FK_adb5c1c902da883288b6dcb023f"`
    );
    await queryRunner.query(`DROP INDEX "IDX_a02d820429038dce37d18f74b6"`);
    await queryRunner.query(`DROP INDEX "IDX_e1e28e472b43bbad7ff3cecdcd"`);
    await queryRunner.query(`DROP TABLE "organization_users_user"`);
    await queryRunner.query(`DROP INDEX "IDX_f8300efd87679e1e21532be980"`);
    await queryRunner.query(`DROP INDEX "IDX_9666c6dcd769c698bed4aa4bf5"`);
    await queryRunner.query(`DROP TABLE "project_users_user"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "organization"`);
    await queryRunner.query(`DROP TABLE "project"`);
    await queryRunner.query(`DROP TABLE "message"`);
    await queryRunner.query(`DROP TABLE "message_partition"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "list"`);
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(`DROP TABLE "tag"`);
  }
}
