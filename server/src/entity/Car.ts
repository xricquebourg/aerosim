import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, OneToMany, JoinColumn, } from 'typeorm';
import { Brand } from './Brand';
import { Genre } from './Genre';
import { Setup } from './Setup';

@Entity()
export class Car extends BaseEntity {
    constructor(name_c: string, brand: Brand) {
        super();
        this.name_c = name_c;
        this.brand = brand;
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length: 50,
    })
    name_c: string;

    @OneToOne(() => Brand)
    @JoinColumn()
    brand: Brand;

    @OneToMany(() => Setup, (setup: Setup) => setup.car)
    setups!: Setup[];

}