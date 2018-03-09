import {
    PrimaryGeneratedColumn,
    Entity,
    Column,
    ManyToOne
} from "typeorm";
import { Place } from "./Place.entity";

@Entity()
export class Reviews {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column({ type: 'varchar'})
    UserName: string;

    @Column({ type: 'varchar'})
    Review: string;

    @ManyToOne( type => Place, place => place.Reviews)
    Place: Place;

}