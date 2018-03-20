"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
// Entities
const Place_entity_1 = require("../entity/Place.entity");
const Reviews_entity_1 = require("../entity/Reviews.entity");
let connection = {
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "yolanda1995",
    database: "placesofinterest",
    synchronize: true,
    logging: false,
    entities: [
        Place_entity_1.Place,
        Reviews_entity_1.Reviews,
    ]
};
exports.default = connection;
//# sourceMappingURL=connection.js.map