"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const greet_1 = require("../libs/greet");
const assert = require("assert");
describe('Greet function test', () => {
    it('returns a greeting to the passed in name in the function', (done) => {
        assert.equal("Hello World", greet_1.default("World"));
        done();
    });
});
//# sourceMappingURL=greet.test.js.map