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

    pgdropdb: {
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
      dbRollback: 'knex migrate:rollback',
      dbMigrate: 'knex migrate:latest',
      dbSeed: 'knex seed:run',
    },

  });

  // returns a Promise.  res = boolean true/false
  function doesDatabaseExist() {
    const command = `psql -l ${config.connection.url} | head`;    // will fail if database does not exist

    return new Promise((resolve, reject) => {
      exec(command, (err, stdout, stderr) => {
        if (err) {
          if (stderr.match(/database "\w+" does not exist/)) {
            resolve(false);
          } else {
            reject(`error checking for existence of database:\n${stdout}\n${stderr}`);
          }
        }
        resolve(true);
      });
    });
  }

  grunt.registerTask('dbCreateIfNeeded', function dbCreateIfNeeded() {
    const done = this.async();

    // (pretty sure this command is obsolete, leaving it here temporarily.  feel free to delete)
    // command: `psql -l ${config.connection.url} | grep \`echo ${config.connection.url} |
    //   sed 's/^.*\\/\\([^\\/]*$\\)/\\1/'\``,

    // there MUST be a better way to see if a database exists...
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

  grunt.registerTask('dbReset', ['dbCreateIfNeeded', 'shell:dbRollback', 'shell:dbMigrate', 'shell:dbSeed']);
  grunt.registerTask('default', ['eslint']);
  grunt.registerTask('test', ['mochaTest']);
};
