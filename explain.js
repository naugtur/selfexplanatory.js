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
        var defString = "function( " + definition.args + " ) " + definition.description + ((definition.returns) ? "\nreturns: " + definition.returns : '');
        var explainedMethod = function () {
            if (definition.validator && !definition.validator.apply(this, arguments)) {
                throw new Usage(defString);
            }
            return method.apply(this, arguments)
        };
        explainedMethod.toString = explainedMethod.toSource = function () {
            return defString;
        }
        return explainedMethod
    }
    //make it self-explanatory
    explain = explain({
        validator: function (o,f) {
            return (typeof f !== "undefined" && f.apply);
        },
        args: "<object: explanation>,<function: your method>",
        description: "adds explanation to the function, just like this one. \n explanation object must contain \n args and description",
        returns: "function: your method with explanation"
    }, explain);

    if (typeof module !== "undefined" && module.exports) {
        module.exports = explain;
    }
    return explain;
})();