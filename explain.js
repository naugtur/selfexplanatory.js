//use:
// myMethod = explain({
//     validator: function (url) {
//         return (typeof url === "string");
//     },
//     args: "<string: url>,<function: success callback>",
//     description: "does stuff",
//     returns: "string: result"
// }, function (url, callback) { ... });

var explain = (function () {
    "use strict";

    function Usage(m) {
        this.message = m || ' unknown';
        this.name = "Usage";
    }
    Usage.prototype = Error.prototype;

    var explain = function (definition, method) {
        if (!(definition.args && definition.description)) {
            throw new Error("Missing definition elements: args and description");
        }
        var defString = "function( " + definition.args + " )\n" + definition.description + ((definition.returns) ? "\nreturns: " + definition.returns : '');
        var describedMethod = function () {
            if (definition.validator && !definition.validator.apply(this, arguments)) {
                throw new Usage(defString);
            }
            return method.apply(this, arguments)
        };
        describedMethod.toString = describedMethod.toSource = function () {
            return defString;
        }
        return describedMethod
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = explain;
    }
    return explain;
})();