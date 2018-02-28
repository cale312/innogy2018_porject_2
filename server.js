"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
require("reflect-metadata");
var logger = require("morgan");
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var typeorm_1 = require("typeorm");
var cookieParser = require("cookie-parser");
// Import the entities
var Place_entity_1 = require("./src/entity/Place.entity");
var connection_1 = require("./src/config/connection");
typeorm_1.createConnection(connection_1["default"])
    .then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('database connection was a success!');
        return [2 /*return*/];
    });
}); })["catch"](function (error) { return console.log(error); });
// Creates and configures an ExpressJS web server.
var Server = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function Server() {
        this.app = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    Server.prototype.middleware = function () {
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(logger('dev'));
        this.app.use(cors());
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    };
    // Configure API endpoints.
    Server.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        // Home route
        this.app.use('/', router);
        // Get all places route
        this.app.get('/api/v1/places', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var code, _placesRepository, places;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        code = res.statusCode;
                        return [4 /*yield*/, typeorm_1.getRepository(Place_entity_1.Place)];
                    case 1:
                        _placesRepository = _a.sent();
                        return [4 /*yield*/, _placesRepository.find()];
                    case 2:
                        places = _a.sent();
                        res.json({
                            code: code,
                            places: places
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        // Get place by ID
        this.app.get('/api/v1/places/:_placeId', function (req, res, next) {
            var code = res.statusCode;
            res.json({
                code: code,
                msg: 'Get place by id route'
            });
        });
        // Add new places route
        this.app.post('/api/v1/places', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var code, AddPlace, placesRepository;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        code = res.statusCode;
                        AddPlace = new Place_entity_1.Place();
                        return [4 /*yield*/, typeorm_1.getRepository(Place_entity_1.Place)];
                    case 1:
                        placesRepository = _a.sent();
                        AddPlace.Name = req.body;
                        AddPlace.Address = req.body;
                        AddPlace.City = req.body;
                        return [4 /*yield*/, placesRepository.save(AddPlace)];
                    case 2:
                        _a.sent();
                        console.log("******", AddPlace);
                        res.json({
                            Results: AddPlace,
                            code: code,
                            msg: 'Add place route'
                        })["catch"](function (error) { return console.log(error); });
                        ;
                        return [2 /*return*/];
                }
            });
        }); });
        // Update places route
        this.app.post('/api/v1/places/:_placeId/update', function (req, res, next) {
            var code = res.statusCode;
            res.json({
                code: code,
                msg: 'Update places route'
            });
        });
        // Delete places route
        this.app.get('/api/v1/places/:_placeId/delete', function (req, res, next) {
            var code = res.statusCode;
            res.json({
                code: code,
                msg: 'Delete places route'
            });
        });
    };
    return Server;
}());
// export
exports["default"] = new Server().app;
