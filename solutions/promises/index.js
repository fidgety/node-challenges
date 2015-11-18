module.exports = {
    toPromise: function (value) {
        return Promise.resolve(value);
    },
    throw: function (err) {
        throw err;
    },
    mixed: function (promiseFn, obj) {
        return promiseFn.then((data) => {
            return Object.assign({}, obj, data);
        });
    },
    merge: function (promises) {
        return Promise.all(promises).then((data) => {
            return Object.assign.apply(null, data);
        });
    }
};
