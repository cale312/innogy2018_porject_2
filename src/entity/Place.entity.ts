import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from 'typeorm';
import {
    Reviews
} from './Reviews.entity';

@Entity()
export class Place {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column({
        type: 'varchar'
    })
    Name: string;

    @Column({
        type: 'varchar'
    })
    Address: string;

    @Column({
        type: 'varchar'
    })
    Category: string;

    @Column({
        type: 'int'
    })
    Likes: number;

    @Column({
        type: 'int'
    })
    Dislikes: number;

    @OneToMany(type => Reviews, reviews => reviews.place)
    Reviews: Reviews[]

}