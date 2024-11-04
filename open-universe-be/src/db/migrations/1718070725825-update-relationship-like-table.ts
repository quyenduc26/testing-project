import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelationshipLikeTable1718070725825 implements MigrationInterface {
    name = 'UpdateRelationshipLikeTable1718070725825'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`REL_e8fb739f08d47955a39850fac2\` ON \`like\``);
        await queryRunner.query(`ALTER TABLE \`like\` DROP COLUMN \`postId\``);
        await queryRunner.query(`ALTER TABLE \`like\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`like\` ADD CONSTRAINT \`FK_d41caa70371e578e2a4791a88ae\` FOREIGN KEY (\`post_id\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`like\` ADD CONSTRAINT \`FK_4356ac2f9519c7404a2869f1691\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`like\` ADD \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`like\` ADD \`postId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_e8fb739f08d47955a39850fac2\` ON \`like\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_4356ac2f9519c7404a2869f1691\``);
        await queryRunner.query(`ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_d41caa70371e578e2a4791a88ae\``);
    }

}
