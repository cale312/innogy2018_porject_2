import greeter from '../libs/greet';
import * as assert from 'assert'

describe('simple greet function test', () => {

    it('returns a greeting to the passed in name in the function', (done: any) => {
        assert.equal("Hello World", greeter("World"));
        done();
    });

});
