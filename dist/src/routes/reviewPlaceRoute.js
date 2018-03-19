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
class Route {
    constructor() {
        this.reviewPlace = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const code = res.statusCode;
            let data = req.body;
            let reviewsRepo = yield typeorm_1.getRepository(Reviews_entity_1.Reviews);
            let newReview = new Reviews_entity_1.Reviews();
            newReview.UserName = data.userName;
            newReview.Review = data.review;
            yield reviewsRepo
                .save(newReview)
                .then((result) => {
                res.json({
                    result
                });
            });
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