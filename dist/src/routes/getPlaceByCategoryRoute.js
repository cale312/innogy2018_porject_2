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
        this.getPlaceByCategory = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const code = res.statusCode;
            const placeCategory = req.params._placeCategory;
            const _placesRepository = yield typeorm_1.getRepository(Place_entity_1.Place);
            yield _placesRepository
                .findOne({ Category: placeCategory })
                .then((place) => __awaiter(this, void 0, void 0, function* () {
                if (place) {
                    res.json({
                        code,
                        place
                    });
                }
                else {
                    res.json({
                        code,
                        place: 'Place does not exist, add it!'
                    });
                }
            }));
        });
        this.router = express_1.Router();
        this.route();
    }
    route() {
        this.router.get('/:_placeCategory', this.getPlaceByCategory);
    }
}
exports.default = new Route().router;
//# sourceMappingURL=getPlaceByCategoryRoute.js.map