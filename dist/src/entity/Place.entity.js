"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Reviews_entity_1 = require("./Reviews.entity");
let Place = class Place {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Place.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], Place.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], Place.prototype, "address", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], Place.prototype, "category", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], Place.prototype, "lng", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], Place.prototype, "lat", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int'
    }),
    __metadata("design:type", Number)
], Place.prototype, "visits", void 0);
__decorate([
    typeorm_1.OneToMany(type => Reviews_entity_1.Reviews, reviews => reviews.place),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], Place.prototype, "reviews", void 0);
Place = __decorate([
    typeorm_1.Entity()
], Place);
exports.Place = Place;
//# sourceMappingURL=Place.entity.js.map