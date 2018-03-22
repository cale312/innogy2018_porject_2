"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const logger = require("morgan");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// import all the route files
const getPlacesRoute_1 = require("./src/routes/getPlacesRoute");
const addPlaceRoute_1 = require("./src/routes/addPlaceRoute");
const deletePlaceRoute_1 = require("./src/routes/deletePlaceRoute");
const updatePlaceRoute_1 = require("./src/routes/updatePlaceRoute");
const getPlaceByIdRoute_1 = require("./src/routes/getPlaceByIdRoute");
const getPlaceByNameRoute_1 = require("./src/routes/getPlaceByNameRoute");
const reviewPlaceRoute_1 = require("./src/routes/reviewPlaceRoute");
// Creates and configures an ExpressJS web server.
class Server {
    //Run configuration methods on the Express instance.
    constructor() {
        this.app = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    middleware() {
        this.app.use(express.static('public'));
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(express.static('public'));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(logger('dev'));
        this.app.use(cors());
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
            next();
        });
    }
    // Configure API endpoints.
    routes() {
        let router = express.Router();
        // Home route
        this.app.use('/', router);
        // Get all places route
        this.app.use('/api/v1/places', getPlacesRoute_1.default);
        // Get place by Name
        this.app.use('/api/v1/places', getPlaceByNameRoute_1.default);
        // Add new places route
        this.app.use('/api/v1/places', addPlaceRoute_1.default);
        // Get place by ID
        this.app.use('/api/v1/places', getPlaceByIdRoute_1.default);
        // Update places route
        this.app.use('/api/v1/places', updatePlaceRoute_1.default);
        // Delete places route
        this.app.use('/api/v1/places', deletePlaceRoute_1.default);
        // Add review about a place
        this.app.use('/api/v1/places', reviewPlaceRoute_1.default);
    }
}
// export
exports.default = new Server().app;
//# sourceMappingURL=server.js.map