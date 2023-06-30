import { MigrationInterface, QueryRunner } from "typeorm";

export class Task1677576119766 implements MigrationInterface {
    name = 'Task1677576119766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_92361996954c289a16013b8cf94"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_92361996954c289a16013b8cf94" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_92361996954c289a16013b8cf94"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_92361996954c289a16013b8cf94" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
