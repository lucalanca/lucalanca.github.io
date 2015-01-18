module.exports = {
    compile: {
        options: {
            baseUrl: '<%= config.targetDir %>',
            name: 'js/main',
            out: '<%= config.targetDir %>/js-build/bundle.js',
            include: ["bower_components/requirejs/require"]
        }
    }
};
