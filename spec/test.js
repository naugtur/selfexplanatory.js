describe("Selfexplanatory.js", function () {


    it('should return explanations', function () {
        var method = jasmine.createSpy('callback');
        var explained = explain({
            args: "<string: url>",
            description: "does stuff",
        }, method);

        var explained2 = explain({
            args: "<string: url>",
            description: "does stuff",
            returns: "int"
        }, method);

        expect(explained.toString()).toEqual("function( <string: url> ) does stuff");
        expect(explained2.toString()).toEqual("function( <string: url> ) does stuff\nreturns: int");

    });

    it('should require proper definition', function (done) {
        var method = jasmine.createSpy('callback');
        try {
            var explained = explain({}, method);
        } catch (e) {
            done();
        }
    });


    it('should call the method with all arguments', function (done) {
        var A = 1,
            B = {
                x: 1
            },
            C = document.body;

        var method = function (a, b, c) {
            if (a === A && b === B && c === C) {
                done();
            }
        };

        var explained = explain({
            args: "<string: url>",
            description: "does stuff",
        }, method);

        explained(A, B, C);


    });

    it("should throw error when arguments don't validate", function () {
        var method = jasmine.createSpy('callback');

        var explained = explain({
            args: "<whatever truthy>",
            description: "does stuff",
            validator: function (a) {
                return !!a;
            }
        }, method);

        expect(function () {
            explained('foo');
        }).not.toThrow();

        expect(function () {
            explained();
        }).toThrow();


    });

    it('should call the method with all arguments when validator is used too', function (done) {
        var A = 1,
            B = {
                x: 1
            },
            C = document.body;

        var method = function (a, b, c) {
            if (a === A && b === B && c === C) {
                done();
            }
        };

        var explained = explain({
            args: "<string: url>",
            description: "does stuff",
            validator: function (a) {
                return !!a;
            }
        }, method);

        explained(A, B, C);


    });

    it('should be self-explanatory itself :)', function (done) {
        
        expect(function () {
            explain({
                args: " ",
                description: " "
            });
        }).toThrow();

    });

});