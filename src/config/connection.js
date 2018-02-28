"use strict";
exports.__esModule = true;
require("reflect-metadata");
// Entities
var Place_entity_1 = require("../entity/Place.entity");
var connection = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "placesOfInterest",
    synchronize: true,
    logging: false,
    entities: [
        Place_entity_1.Place,
    ]
};
exports["default"] = connection;
