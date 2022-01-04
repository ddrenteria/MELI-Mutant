import {MigrationInterface, QueryRunner} from "typeorm";

export class addDnaEntity1641330426813 implements MigrationInterface {
    name = 'addDnaEntity1641330426813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`dna\` (\`dna\` varchar(255) NOT NULL, \`isMutant\` tinyint NOT NULL, PRIMARY KEY (\`dna\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`dna\``);
    }

}
