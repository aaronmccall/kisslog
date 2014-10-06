var slice = Array.prototype.slice;
slice = slice.call.bind(slice.call, slice);

var levels = {
    debug: 1,
    info: 2,
    warn: 3,
    error: 4
};

module.exports = function _kisslog(config) {
    config = config || {};
    var logLevel = levels.error;
    if (typeof config.debug === 'number') {
        logLevel = config.debug;
    } else if (config.debug === true) {
        logLevel = 1;
    }
    return function _log(level) {
        var args = slice(arguments, (typeof level === 'number' && arguments.length > 1 ? 1 : 0));
        if (typeof level !== 'number') {
            level = 2;
        }
        if (level >= logLevel) {
            var logArgs = args;
            if (typeof window === 'undefined') {
                var arg;
                var i = -1;
                while ((arg = args[++i])) {
                    if (typeof arg === 'string') logArgs[i] = arg.replace(/%o/g, '%j');
                }
            }
            console.log.apply(console, logArgs);
        }
    };
};

for (var key in levels) {
    module.exports[key] = levels[key];
}