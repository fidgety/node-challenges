'use strict';

const fs = require('fs');
const path = require('path');

const solutions = module.exports = {
    toPromise: function(value) {
        return Promise.resolve(value);
    },
    mixed: function(values) {
        return Promise.all(values.map((value) => Promise.resolve(value)))
            .then((result) => Object.assign.apply(null, result));
    },
    merge: function(promises) {
        return Promise.all(promises).then((data) => {
            return Object.assign.apply(null, data);
        });
    },
    promisify: function(fn) {
        return function() {
            const args = new Array(arguments.length);

            for (let i = 0; i < arguments.length; i++) {
                args[i] = arguments[i];
            }

            return new Promise((resolve, reject) => {
                args.push((err, result) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve(result);
                });

                fn.apply(this, args);
            });
        };
    },
    manipulate: function() {
        const readFile = solutions.promisify(fs.readFile);
        const readDir = solutions.promisify(fs.readdir);
        const basePath = __dirname + '/../../fixtures/posts/';

        return readDir(basePath)
            .then((files) => files.filter((file) => file.charAt(0) !== '.')) // Filter out dotfiles
            .then((files) => files.map((file) => {
                return readFile(basePath + file, 'utf8')
                    .then((content) => {
                        const key = path.basename(file, '.txt');

                        return {
                            [key]: content.toUpperCase().trim()
                        };
                    });
            }))
            .then((posts) => Promise.all(posts));
    }
};
