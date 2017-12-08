#! /usr/bin/env node

const shell = require('shelljs');
const chalk = require('chalk');

module.exports = () => {
  if (!shell.which('git')) {
    shell.echo(`${chalk.bold.redBright('Git is not installed')}`);
    return false;
  }
  return true;
};
