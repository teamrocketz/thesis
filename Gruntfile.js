const config = require('config').knex;

module.exports = (grunt) => {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    eslint: {
      target: ['Gruntfile.js', 'client/**/*.js', 'client/**/*.jsx', 'db/**/*.js', 'server/**/*.js', 'config/**/*.js'],
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
        },
        src: ['server/test/**/*.js'],
      },
    },

    pgcreatedb: {
      default: {
        connection: {
          user: config.connection.user,
          password: config.connection.password,
          host: config.connection.host,
          port: config.connection.port,
          database: 'template1',
        },
        name: config.connection.database,
      },
    },

  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-pg');

  grunt.registerTask('default', ['eslint']);
  grunt.registerTask('test', ['mochaTest']);
};
