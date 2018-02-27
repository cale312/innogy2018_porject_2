import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Place {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column({ type: 'varchar'})
    Name: string;

    @Column({ type: 'varchar'})
    Address: string;

    @Column({ type: 'varchar'})
    City: string;

    @Column({ type: 'varchar'})
    Category: string;

}
