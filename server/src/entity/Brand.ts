import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Brand extends BaseEntity {
    constructor(name_b: string) {
        super();
        this.name_b = name_b;
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length: 50,
    })
    name_b: string;

}