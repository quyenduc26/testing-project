import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRequestTable1716515967001 implements MigrationInterface {
    name = 'CreateRequestTable1716515967001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`request\` (\`user_id\` int NOT NULL, \`follower_id\` int NOT NULL, \`followed_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`status\` tinyint NOT NULL DEFAULT '0', PRIMARY KEY (\`user_id\`, \`follower_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`request\` ADD CONSTRAINT \`FK_3a3d93f532a056b0d89d09cdd21\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`request\` ADD CONSTRAINT \`FK_9e0228790aac217a91ed57e3d3f\` FOREIGN KEY (\`follower_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`request\` DROP FOREIGN KEY \`FK_9e0228790aac217a91ed57e3d3f\``);
        await queryRunner.query(`ALTER TABLE \`request\` DROP FOREIGN KEY \`FK_3a3d93f532a056b0d89d09cdd21\``);
        await queryRunner.query(`DROP TABLE \`request\``);
    }

}
