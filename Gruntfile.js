/* eslint-disable prefer-arrow-callback */

const Promise = require('bluebird');
const dbConfig = require('./knexfile.js');
const exec = require('child_process').exec;

module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt);   // eslint-disable-line global-require

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    eslint: {
      target: ['Gruntfile.js', 'client/**/*.js', 'client/**/*.jsx', 'db/**/*.js', 'server/**/*.js', 'test/**/*.js'],
    },

    // mochacli supports forcing color output in a subshell
    mochacli: {
      options: {
        colors: true,
        reporter: 'spec',
        files: ['test/**/*.js'],
      },
      main: {},
    },

    // mochaTest supports debug mode for test debugging
    mochaTest: {
      options: {
        reporter: 'spec',
      },
      debug: {
        src: ['test/**/*.js'],
      },
    },

    pgcreatedb: {
      default: {
        connection: {
          user: dbConfig.connection.user,
          password: dbConfig.connection.password,
          host: dbConfig.connection.host,
          port: dbConfig.connection.port,
          database: 'template1',
        },
        name: dbConfig.connection.database,
      },
    },

    shell: {
      'client-build': 'webpack',
      'client-dev': 'webpack --watch --color',
      dbMigrate: 'knex migrate:latest',
      server: 'nodemon --ignore test --ignore client server',
      'server-debug': 'nodemon --ignore test --ignore client --inspect server',
      'server-debug-brk': 'nodemon --ignore test --ignore client --inspect --debug-brk server',
      // see: https://github.com/pghalliday/grunt-mocha-test#using-node-flags
      // for an explanation of why these are here, rather than in mocha configs above
      test: 'NODE_ENV=test ./node_modules/.bin/grunt test-run',
      'test-debug': 'NODE_ENV=test node --inspect --debug-brk ./node_modules/.bin/grunt test-run-debug',
    },

  });

  // returns a Promise.  res = boolean true/false
  // there MUST be a better way to see if a database exists...
  function doesDatabaseExist() {
    const command = `psql -l ${dbConfig.connection.url} | head`;    // will fail if database does not exist

    return new Promise((resolve, reject) => {
      exec(command, (err, stdout, stderr) => {
        if (stderr.match(/database "\w+" does not exist/)) {
          resolve(false);
        } else if (err) {
          reject(`error checking for existence of database:\n${stdout}\n${stderr}`);
        }
        resolve(true);
      });
    });
  }

  grunt.registerTask('dbCreateIfNeeded', function dbCreateIfNeeded() {
    const done = this.async();

    doesDatabaseExist()
      .then((exists) => {
        if (!exists) {
          grunt.task.run('pgcreatedb');
        }
        done();
      })
      .catch((err) => {
        grunt.fail.fatal(err);
        done();
      });
  });

  grunt.registerTask('client-build', ['shell:client-build']);
  grunt.registerTask('client-dev', ['shell:client-dev']);

  grunt.registerTask('server', ['shell:server']);
  grunt.registerTask('server-debug', ['shell:server-debug']);
  grunt.registerTask('server-debug-brk', ['shell:server-debug-brk']);

  grunt.registerTask('test', ['shell:test']);
  grunt.registerTask('test-debug', ['shell:test-debug']);
  // for internal grunt use only (invoked via shell:test and shell:test-debug)
  grunt.registerTask('test-run', ['dbCreateIfNeeded', 'mochacli:main']);
  grunt.registerTask('test-run-debug', ['dbCreateIfNeeded', 'mochaTest:debug']);

  // called automatically by yarn after 'yarn install' (including every heroku build)
  grunt.registerTask('postinstall', ['client-build', 'dbsetup']);

  // invoked by heroku post-deployment (including staging -> production promotion) via Procfile
  grunt.registerTask('dbsetup', ['dbCreateIfNeeded', 'shell:dbMigrate']);

  // invoked via yarn test (e.g. for Heroku CI builds)
  grunt.registerTask('verify', ['eslint', 'test']);
};
