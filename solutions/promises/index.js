var fs = require('fs');
var path = require('path');

var solutions = module.exports = {
    toPromise: function (value) {
        return Promise.resolve(value);
    },
    mixed: function (values) {
        return Promise.all(values.map((value) => Promise.resolve(value)))
            .then((result) => Object.assign.apply(null, result));
    },
    merge: function (promises) {
        return Promise.all(promises).then((data) => {
            return Object.assign.apply(null, data);
        });
    },
    promisify: function (fn) {
        return function () {
            var args = new Array(arguments.length);

            for (var i = 0; i < arguments.length; i++) {
                args[i] = arguments[i];
            }

            return new Promise((resolve, reject) => {
                args.push((err, result) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve(result);
                });

                fn.apply(this, args)
            });
        }
    },
    manipulate: function () {
        var readFile = solutions.promisify(fs.readFile);
        var readDir = solutions.promisify(fs.readdir);
        var basePath = __dirname + '/../../fixtures/posts/';

        return readDir(basePath)
            .then((files) => files.filter((file) => file.charAt(0) !== '.')) // Filter out dotfiles
            .then((files) => files.map((file) => {
                return readFile(basePath + file, 'utf8')
                    .then((content) => {
                        var key = path.basename(file, '.txt');

                        return {
                            [key]: content.toUpperCase().trim()
                        };
                    });
            }))
            .then((posts) => Promise.all(posts));
    }
};
