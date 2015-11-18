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

        describe('throw', () => {
            it('should re-throw an error from a catch', () => {
                return Promise.resolve('value').then(() => {
                    throw new Error('Oops!');
                }).catch(promiseMethods.throw).then(() => {
                    throw new Error('You didn\'t throw!');
                }).catch(err => {
                    err.message.should.equal('Oops!');
                });
            });
        });
    });

    describe('Advanced', () => {
        describe('Mixed', () => {
            it('should return a object containing the passed in object and the data of the passes in promise', () => {
                return promiseMethods.mixed(Promise.resolve({
                    fizz: 'buzz'
                }), {
                    foo: 'bar'
                }).then((data) => data.should.deep.equal({
                    foo: 'bar',
                    fizz: 'buzz'
                }));
            });
        });

        describe('Merge', () => {
            it('should return a object containing the passed in object and the data of the passes in promise', () => {
                return promiseMethods.merge([Promise.resolve({
                    foo: 'bar'
                }), Promise.resolve({
                    fizz: 'buzz'
                })]).then((data) => data.should.deep.equal({
                    foo: 'bar',
                    fizz: 'buzz'
                }));
            });
        });
    });
});
