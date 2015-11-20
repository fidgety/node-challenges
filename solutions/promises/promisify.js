'use strict';

module.exports = function(fn) {
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
};
