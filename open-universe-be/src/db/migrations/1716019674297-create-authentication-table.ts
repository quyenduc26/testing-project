import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuthenticationTable1716019674297 implements MigrationInterface {
  name = 'CreateAuthenticationTable1716019674297';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`authentication\` (\`user_id\` int NOT NULL AUTO_INCREMENT, \`refresh_token\` varchar(255) NULL, PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`authentication\``);
  }
}
