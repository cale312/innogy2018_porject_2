import 'reflect-metadata';
import {
    MysqlConnectionOptions
} from 'typeorm/driver/mysql/MysqlConnectionOptions';

// Entities
import {
    Place
} from '../entity/Place.entity';
import {
    Reviews
} from '../entity/Reviews.entity';

let connection: MysqlConnectionOptions = {
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    database: "placesofinterest",
    synchronize: true,
    logging: false,
    entities: [
        Place,
        Reviews,
    ]
};

export default connection;