import {MigrationInterface, QueryRunner} from "typeorm";

export class init1641515746622 implements MigrationInterface {
    name = 'init1641515746622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dna" ("dna" character varying NOT NULL, "isMutant" boolean NOT NULL, CONSTRAINT "PK_30b4d97db7d8d3879e82b95ed87" PRIMARY KEY ("dna"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "dna"`);
    }

}
