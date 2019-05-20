import { MigrationInterface, QueryRunner } from "typeorm";

export class newOrgStuff1556936337089 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "organization" ADD "inviteLink" character varying(2000) NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "organization" DROP COLUMN "inviteLink"`
    );
  }
}
