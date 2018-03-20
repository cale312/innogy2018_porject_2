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
const express_1 = require("express");
const Reviews_entity_1 = require("../entity/Reviews.entity");
const Place_entity_1 = require("../entity/Place.entity");
class Route {
    constructor() {
        this.reviewPlace = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const code = res.statusCode;
            let data = req.body;
            let placeName = req.params._placeName;
            let placeRepo = yield typeorm_1.getRepository(Place_entity_1.Place);
            yield placeRepo
                .findOne({
                name: placeName
            })
                .then((place) => __awaiter(this, void 0, void 0, function* () {
                if (place) {
                    let newReview = new Reviews_entity_1.Reviews();
                    newReview.userName = data.userName;
                    newReview.review = data.review;
                    newReview.place = place;
                    typeorm_1.getRepository(Reviews_entity_1.Reviews)
                        .manager
                        .save(newReview)
                        .then(() => {
                        placeRepo.find({
                            relations: ["Reviews"]
                        })
                            .then((places) => __awaiter(this, void 0, void 0, function* () {
                            res.json({
                                code,
                                places
                            });
                        }));
                    });
                }
                else {
                    res.json({
                        msg: 'place not found'
                    });
                }
            }));
        });
        this.router = express_1.Router();
        this.route();
    }
    route() {
        this.router.post('/:_placeName/review', this.reviewPlace);
    }
}
exports.default = new Route().router;
//# sourceMappingURL=reviewPlaceRoute.js.map