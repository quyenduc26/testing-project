import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLikeTable1716519865186 implements MigrationInterface {
  name = 'CreateLikeTable1716519865186';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`like\` (\`post_id\` int NOT NULL, \`user_id\` int NOT NULL, \`followed_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`status\` tinyint NOT NULL DEFAULT '0', \`postId\` int NULL, \`userId\` int NULL, UNIQUE INDEX \`REL_e8fb739f08d47955a39850fac2\` (\`userId\`), PRIMARY KEY (\`post_id\`, \`user_id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`REL_e8fb739f08d47955a39850fac2\` ON \`like\``);
    await queryRunner.query(`DROP TABLE \`like\``);
  }
}
