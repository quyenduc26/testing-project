import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOneToOneRelation1717118265170 implements MigrationInterface {
  name = 'AddOneToOneRelation1717118265170';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE authentication
            ADD CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES user(id)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE authentication
            DROP CONSTRAINT FK_user_id,
        `);
  }
}
