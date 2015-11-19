module.exports = {
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
    }
};
