function Counter(initial) {
    var val = initial;
    return {
        increment: function () {
            val += 1;
        },
        reset: function () {
            val = initial;
        },
        get: function () {
            return val;
        }
    }
};

module.exports = Counter;
