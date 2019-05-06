import { MigrationInterface, QueryRunner } from "typeorm";

export class nullable1556757385541 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "description" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "endTime" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "dueDate" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "list" ALTER COLUMN "description" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "project" ALTER COLUMN "description" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "organization" ALTER COLUMN "description" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "organization" ALTER COLUMN "icon" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "displayName" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_059e69c318702e93998f26d1528"`
    );
    await queryRunner.query(
      `ALTER TABLE "message_partition" ALTER COLUMN "url" DROP NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "message_partition" ALTER COLUMN "url" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_059e69c318702e93998f26d1528" UNIQUE ("displayName")`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "displayName" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "organization" ALTER COLUMN "icon" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "organization" ALTER COLUMN "description" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "project" ALTER COLUMN "description" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "list" ALTER COLUMN "description" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "dueDate" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "endTime" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "description" SET NOT NULL`
    );
  }
}
