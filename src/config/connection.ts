
import 'reflect-metadata';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

// Entities
import { Place } from '../entity/Place.entity';

let connection: MysqlConnectionOptions = {
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "yolanda1995",
    database: "placesofinterest",
    synchronize: true,
    logging: false,
    entities: [
        Place,
    ]
};

export default connection;