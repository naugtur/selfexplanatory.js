module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        
        uglify: {
            options: {
                banner: "// <%= pkg.name %> v<%= pkg.version %> (<%= grunt.template.today('yyyy-mm-dd') %>) \n" +
                    "// license:<%= pkg.license %> \n" +
                    "// <%= pkg.author %> \n"
            },
            dist: {
                src: "explain.js",
                dest: "explain.min.js"
            }
        },

        jasmine: {
            src: "explain.js",
            options: {
                specs: 'spec/*.js'
            }
        }
    })
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks('grunt-contrib-jasmine');


    grunt.registerTask("test", ["jasmine"]);
    grunt.registerTask("dist", ["test", "uglify"]);

    grunt.registerTask("default", ["dist"]);
}
