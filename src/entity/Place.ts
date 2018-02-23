import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Place {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar'})
    name: string;

    @Column({ type: 'varchar'})
    address: string;

    @Column({ type: 'varchar'})
    city: string;

}
