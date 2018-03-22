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
    id: number;

    @Column({ type: 'varchar'})
    userName: string;

    @Column({ type: 'varchar'})
    review: string;

    @ManyToOne( type => Place, place => place.reviews)
    place: Place;

}