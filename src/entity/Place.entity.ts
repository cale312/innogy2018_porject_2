import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    JoinColumn
} from 'typeorm';
import {
    Reviews
} from './Reviews.entity';

@Entity()
export class Place {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar'
    })
    name: string;

    @Column({
        type: 'varchar'
    })
    address: string;

    @Column({
        type: 'varchar'
    })
    category: string;

    @Column({
        type: 'int'
    })
    likes: number;

    @Column({
        type: 'int'
    })
    dislikes: number;

    @OneToMany(type => Reviews, reviews => reviews.place)
    @JoinColumn()
    reviews: Reviews[];

}