requirejs.config({
  baseUrl: '../js/',
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    mediaQuery: '../bower_components/sensible/mediaQuery',
    project: '../components/project/project',
    waypoints: '../bower_components/jquery-waypoints/waypoints.min',
  },
  shim: {
    waypoints: ['jquery']
  },
  optimize: "uglify",
  modules: [{
    name: "main"
  }]
});
