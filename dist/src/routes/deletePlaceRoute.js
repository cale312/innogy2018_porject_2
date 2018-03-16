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
const typeorm_1 = require("typeorm");
const Place_entity_1 = require("../entity/Place.entity");
const express_1 = require("express");
class Route {
    constructor() {
        this.deletePlace = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const code = res.statusCode;
            let placeName = req.params._placeName;
            let placesRepository = yield typeorm_1.getRepository(Place_entity_1.Place);
            let toDelete = yield placesRepository.findOne({
                Name: placeName
            });
            yield placesRepository
                .remove(toDelete)
                .then((result) => __awaiter(this, void 0, void 0, function* () {
                let places = yield placesRepository.find();
                res.json({
                    code,
                    places
                });
            }));
        });
        this.router = express_1.Router();
        this.route();
    }
    route() {
        this.router.delete('/:_placeName/delete', this.deletePlace);
    }
}
exports.default = new Route().router;
//# sourceMappingURL=deletePlaceRoute.js.map