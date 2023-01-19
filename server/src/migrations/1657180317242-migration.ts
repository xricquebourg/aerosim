import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1657180317242 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'INSERT INTO user (firstName, lastName, email, password) VALUES(\'userfirst\',\'userlast\',\'user@mail.fr\',\'password\')'
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
