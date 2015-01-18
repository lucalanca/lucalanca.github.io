module.exports = {
  options: {
      report: 'gzip'
    },
    uglify: {
      files: {
        '<%= config.targetDir %>/css': ['<%= config.targetDir %>/css/*.css']
      }
    }
}
