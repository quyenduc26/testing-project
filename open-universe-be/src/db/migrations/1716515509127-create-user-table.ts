import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1716515509127 implements MigrationInterface {
  name = 'CreateUserTable1716515509127';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`full_name\` varchar(255) NOT NULL, \`user_name\` varchar(255) NOT NULL, \`date_of_birth\` date NULL, \`password\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, \`avatar\` varchar(255) NULL, \`phone_number\` varchar(12) NULL, \`role\` enum ('admin', 'user') NOT NULL DEFAULT 'user', \`gender\` enum ('0', '1', '2') NOT NULL DEFAULT '2', \`status\` enum ('active', 'inactive') NOT NULL DEFAULT 'active', \`cover\` varchar(255) NULL, \`biography\` text NULL, \`instagram\` varchar(255) NULL, \`facebook\` varchar(255) NULL, \`create_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_d34106f8ec1ebaf66f4f8609dd\` (\`user_name\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_01eea41349b6c9275aec646eee\` (\`phone_number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_01eea41349b6c9275aec646eee\` ON \`user\``);
    await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
    await queryRunner.query(`DROP INDEX \`IDX_d34106f8ec1ebaf66f4f8609dd\` ON \`user\``);
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
