import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
    constructor(firstName: string, email: string) {
        super();
        this.firstName = firstName;
        this.email = email;
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length: 50,
    })
    firstName: string;

    @Column({
        length: 50,
        nullable: true
    })
    lastName!: string;

    @Column({
        length: 100,
        unique: true
    })
    email: string;

    @Column({
        nullable: true
    })
    password!: string;

}