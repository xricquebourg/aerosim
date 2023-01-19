import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, ManyToOne, JoinColumn, } from 'typeorm';
import { Parts } from './Parts';
import { Car } from './Car';
import { Genre } from './Genre';

@Entity()
export class Setup extends BaseEntity {
    constructor(value_s: string, part: Parts, genre: Genre,) {
        super();
        this.value_s = value_s;
        this.genre = genre;
        this.part = part;
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length: 20,
    })
    value_s: string;

    @OneToOne(() => Parts)
    @JoinColumn()
    part: Parts;

    @OneToOne(() => Genre)
    @JoinColumn()
    genre: Genre;

    @ManyToOne(() => Car, (car: Car) => car.setups)
    car!: Car[];

}