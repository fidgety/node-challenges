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
            it('should merge the data of the promises passed in', () => {
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

        describe('Promisify', () => {
            it('should turn a node style callback function into a Promise', () => {
                return promiseMethods.promisify(function (str, cb) {
                    setTimeout(() => {
                        cb(null, str);
                    });
                })('hello').then((data) => data.should.equal('hello'));
            });

            it('should handle errors', () => {
                return promiseMethods.promisify(function (cb) {
                    setTimeout(() => {
                        cb(new Error('Oh no!'));
                    });
                })().catch((err) => err.message.should.equal('Oh no!'));
            });

            it('should handle multiple args', () => {
                return promiseMethods.promisify(function (str1, str2, cb) {
                    setTimeout(() => {
                        cb(null, str1 + ' ' + str2);
                    });
                })('hello', 'there').then((data) => data.should.equal('hello there'));
            });
        });
    });
});
