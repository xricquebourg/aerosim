import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, } from 'typeorm';
import { Brand } from './Brand';
import { Genre } from './Genre';

@Entity()
export class Parts extends BaseEntity {
    constructor(name_p: string, brand: Brand, genre: Genre) {
        super();
        this.name_p = name_p;
        this.genre = genre;
        this.brand = brand;
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length: 50,
    })
    name_p: string;

    @OneToOne(() => Brand)
    @JoinColumn()
    brand: Brand;

    @OneToOne(() => Genre)
    @JoinColumn()
    genre: Genre;

}