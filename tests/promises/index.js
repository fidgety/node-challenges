var chai = require('chai');
chai.should();
chai.use(require('chai-things'));
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
            describe('Given an array which contains both normal objects and Promises which return objects', () => {
                it('should merge the objects and return the result', () => {
                    return promiseMethods.mixed([Promise.resolve({
                        fizz: 'buzz'
                    }), Promise.resolve({
                        snap: 'crackle'
                    }), {
                        foo: 'bar'
                    }]).then((data) => data.should.deep.equal({
                        foo: 'bar',
                        snap: 'crackle',
                        fizz: 'buzz'
                    }));
                });
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

        describe('Manipulating data return by a promise', () => {
            // This relies on the promisify function, please complete that first
            describe('Read each file in fixtures/posts', () => {
                it('should return an array of objects containing {filename: fileContents} fileContents should be uppercase and trimmed', () => {
                    return promiseMethods.manipulate().then((posts) => {
                        posts.should.include.something.that.deep.equals({ foo: 'BAR' });
                        posts.should.include.something.that.deep.equals({ fizz: 'BUZZ' });
                    })
                });
            });
        });
    });
});
