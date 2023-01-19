import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Genre extends BaseEntity {
    constructor(name_g: string) {
        super();
        this.name_g = name_g;
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length: 50,
    })
    name_g: string;

}