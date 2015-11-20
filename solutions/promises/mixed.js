'use strict';

module.exports = function(values) {
    return Promise.all(values.map((value) => Promise.resolve(value)))
        .then((result) => Object.assign.apply(null, result));
};
