var slice = Array.prototype.slice;
slice = slice.call.bind(slice.call, slice);

module.exports = function _kisslog(config) {
    return function _log() {
        var args = slice(arguments);
        var logArgs = args;
        if (config && config.debug) {
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