
import 'reflect-metadata';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

// Entities
import { Place } from '../entity/Place.entity';

let connection: MysqlConnectionOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "hellsgate",
    database: "placesOfInterest",
    synchronize: true,
    logging: false,
    entities: [
        Place,
    ]
};

export default connection;