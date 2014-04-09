selfexplanatory.js
==================

Make your functions and methods self-explanatory with this simple wrapper.

**Bring documentation right where it's needed**

Whatever you're creating, a library or an API or a widget - if you want someone to use it, let them do so without even looking for the documentation. You know they prefer it that way.

## What it does

Whenever someone sees the `explain`ed function in developer tools, on an object listing etc. it will show the instructions instead of bits of its definition. 

If the function gets called incorrectly, It will throw an error containing complete usage information. No need to browse documentation anymore!

## Let's explain how it works

    explain( <object:explanation>, <function: yourmethod> )
        // returns: function with some special behaviour
    
A more complete example maybe:

    myMethod : explain({
        args: "<string: url>,<function: success callback>",
        description: "does stuff",
        returns: "string: result",
        validator: function (url) {
            return (typeof url === "string");
        }
    }, function (url, callback) { ... });
    
    
The explanation object consists of the following:

 - `args` *required* a single line describing arguments of the function
 - `description` *required* any description of the function you want to give
 - `returns` *optional* just say what gets returned
 - `validator` *optional* a function that will get called before the actual `explain`ed method with the same arguments. If the function returns something falsy, an error is thrown with the whole explanation in it. If `validator` returns truthy, your method gets called.
 
`explain`ed method will correctly resolve `this` reference. 

When an invalid call is made, this is thrown:

    Usage: function( <string: url>,<function: success callback> )
    does stuff 
    returns: string: result




    
------------

I don't recommend `explain`ing constructor functions and prototypes, because you loose the `instanceof` feature. 
 
 
