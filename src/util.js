
function _extends() {
    _extends = Object.assign || function (target) {
        for (let i = 1; i < arguments.length; i++) {
            let source = arguments[i];

            for (let key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    return _extends.apply(this, arguments);
}

function isFunction(fn) {
    return typeof fn === 'function';
}

export {_extends, isFunction};