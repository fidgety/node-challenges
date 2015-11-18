require('chai').should();
var path = require('path');

var promiseMethods = require(path.join('../../', process.env.NODE_ENV, '/promises'));

describe('Promises', () => {
    describe('Basic', () => {
        describe('toPromise', () => {
            it('should turn the passed it value into a promise', () => {
                return promiseMethods.toPromise('a').then((data) => data.should.equal('a'));
            });
        });
    });
});
