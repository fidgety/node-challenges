'use strict';

const fs = require('fs');
const path = require('path');
const promisify = require('./promisify');

module.exports = function() {
    const readFile = promisify(fs.readFile);
    const readDir = promisify(fs.readdir);
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
};
