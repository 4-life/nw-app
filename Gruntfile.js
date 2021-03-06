module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      node: {
        files: ['app/**/*'],
        tasks: ['nodewebkit'],
        options: {
          spawn: false,
        }
      }
    },
    nodewebkit: {
      options: {
        version: '0.12.3',
        platforms: ['win'/*,'osx','linux'*/], // Платформы, под которые будет строиться наше приложение
        buildDir: './build', // Путь, по которому будет располагаться построенное приложение
		winIco:'app.ico',
		macIcns:'app.icns'
      },
      src: './app2/**/*' // Путь, по которому располагаются исходные коды приложения
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.registerTask('default', ['nodewebkit']);
};

