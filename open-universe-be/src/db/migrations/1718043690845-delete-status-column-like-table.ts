import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteStatusColumnLikeTable1718043690845 implements MigrationInterface {
    name = 'DeleteStatusColumnLikeTable1718043690845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`like\` DROP COLUMN \`status\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`like\` ADD \`status\` tinyint NOT NULL DEFAULT '0'`);
    }

}
