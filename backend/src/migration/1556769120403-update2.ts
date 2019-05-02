import {MigrationInterface, QueryRunner} from "typeorm";

export class update21556769120403 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_adb5c1c902da883288b6dcb023f"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_941bf6d26ce243880b69b0fd3b3"`);
        await queryRunner.query(`ALTER TABLE "list" DROP CONSTRAINT "FK_eb435281befdcd4395e3106b44f"`);
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "FK_2bcd50772082305f3bcee6b6da4"`);
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "FK_a1fb224502f5f78de30c7af7888"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_3dbcf27d6bb07da664c28231460"`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_adb5c1c902da883288b6dcb023f" FOREIGN KEY ("baseTaskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_941bf6d26ce243880b69b0fd3b3" FOREIGN KEY ("baseListId") REFERENCES "list"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "list" ADD CONSTRAINT "FK_eb435281befdcd4395e3106b44f" FOREIGN KEY ("baseProjectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "FK_2bcd50772082305f3bcee6b6da4" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "FK_a1fb224502f5f78de30c7af7888" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_3dbcf27d6bb07da664c28231460" FOREIGN KEY ("baseOrganizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_3dbcf27d6bb07da664c28231460"`);
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "FK_a1fb224502f5f78de30c7af7888"`);
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "FK_2bcd50772082305f3bcee6b6da4"`);
        await queryRunner.query(`ALTER TABLE "list" DROP CONSTRAINT "FK_eb435281befdcd4395e3106b44f"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_941bf6d26ce243880b69b0fd3b3"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_adb5c1c902da883288b6dcb023f"`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_3dbcf27d6bb07da664c28231460" FOREIGN KEY ("baseOrganizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "FK_a1fb224502f5f78de30c7af7888" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "FK_2bcd50772082305f3bcee6b6da4" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "list" ADD CONSTRAINT "FK_eb435281befdcd4395e3106b44f" FOREIGN KEY ("baseProjectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_941bf6d26ce243880b69b0fd3b3" FOREIGN KEY ("baseListId") REFERENCES "list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_adb5c1c902da883288b6dcb023f" FOREIGN KEY ("baseTaskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
