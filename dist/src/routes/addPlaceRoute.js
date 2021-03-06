"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Place_entity_1 = require("../entity/Place.entity");
const typeorm_1 = require("typeorm");
const express_1 = require("express");
class Route {
    constructor() {
        this.addPlace = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const code = res.statusCode;
            let placesRepository = yield typeorm_1.getRepository(Place_entity_1.Place);
            // Check if place with the same name exists 
            let foundPlaceWithName = yield placesRepository.findOne({
                name: req.body.Name
            });
            // If place with same name is found, return error
            if (foundPlaceWithName) {
                res.json({
                    code,
                    msg: "exists"
                });
            }
            else {
                let newPlace = new Place_entity_1.Place();
                newPlace.name = req.body.Name;
                newPlace.address = req.body.Address;
                newPlace.category = req.body.Category;
                newPlace.visits = 0;
                newPlace.lng = req.body.Lng;
                newPlace.lat = req.body.Lat;
                yield placesRepository.save(newPlace)
                    .then((place) => {
                    res.json({
                        code,
                        place
                    });
                });
            }
        });
        this.router = express_1.Router();
        this.route();
    }
    route() {
        this.router.post('/', this.addPlace);
    }
}
exports.default = new Route().router;
//# sourceMappingURL=addPlaceRoute.js.map