import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

@Entity()
export class Dna extends BaseEntity {
    @PrimaryColumn()
    dna: string;

    @Column()
    isMutant: boolean;
}