/* eslint-disable prefer-arrow-callback */

const Promise = require('bluebird');
const config = require('./knexfile.js');
const exec = require('child_process').exec;

module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt);   // eslint-disable-line global-require

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    eslint: {
      target: ['Gruntfile.js', 'client/**/*.js', 'client/**/*.jsx', 'db/**/*.js', 'server/**/*.js', 'config/**/*.js'],
    },

    mochaTest: {
      options: {
        reporter: 'spec',
      },
      main: {
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

    shell: {
      'client-build': 'webpack',
      'client-dev': 'webpack --watch --color',
      dbRollback: 'knex migrate:rollback',
      dbMigrate: 'knex migrate:latest',
      dbSeed: 'knex seed:run',
      server: 'nodemon server',
      'server-debug': 'nodemon --inspect server',
      'server-debug-brk': 'nodemon --inspect --debug-brk server',
      // see: https://github.com/pghalliday/grunt-mocha-test#using-node-flags
      // for an explanation of why this is here, rather than in mocha configs above
      'test-debug': 'node --inspect --debug-brk ./node_modules/.bin/grunt test',
    },

  });

  // returns a Promise.  res = boolean true/false
  // there MUST be a better way to see if a database exists...
  function doesDatabaseExist() {
    const command = `psql -l ${config.connection.url} | head`;    // will fail if database does not exist

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


  grunt.registerTask('test', ['mochaTest:main']);
  grunt.registerTask('test-debug', ['shell:test-debug']);

  grunt.registerTask('client-build', ['shell:client-build']);
  grunt.registerTask('client-dev', ['shell:client-dev']);

  grunt.registerTask('server', ['shell:server']);
  grunt.registerTask('server-debug', ['shell:server-debug']);
  grunt.registerTask('server-debug-brk', ['shell:server-debug-brk']);

  grunt.registerTask('postinstall', ['client-build']);
  grunt.registerTask('postrelease', ['dbCreateIfNeeded', 'shell:dbMigrate']);
  grunt.registerTask('new-env-setup', ['shell:dbSeed']);
  grunt.registerTask('verify', ['eslint', 'test']);

  grunt.registerTask('dbSetup', ['dbCreateIfNeeded', 'shell:dbMigrate', 'shell:dbSeed']);
};
