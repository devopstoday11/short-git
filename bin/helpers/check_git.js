const shell = require('shelljs');
const chalk = require('chalk');

module.expoerts = () => {
  if (!shell.which('gitdsdf')) {
    shell.echo(`${chalk.bold.redBright('Git is not installed')}`);
    return false;
  }
  return true;
};
