'use strict';

module.exports = function(promises) {
    return Promise.all(promises).then((data) => {
        return Object.assign.apply(null, data);
    });
};
