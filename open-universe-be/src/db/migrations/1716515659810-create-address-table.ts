import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAddressTable1716515659810 implements MigrationInterface {
    name = 'CreateAddressTable1716515659810'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`address\` (\`id\` int NOT NULL AUTO_INCREMENT, \`street\` varchar(255) NULL, \`state\` varchar(255) NULL, \`city\` varchar(255) NULL, \`country\` varchar(255) NULL, \`is_default\` tinyint NULL DEFAULT 0, \`user_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`address\``);
    }

}
