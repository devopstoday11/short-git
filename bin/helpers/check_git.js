const shell = require('shelljs');
const chalk = require('chalk');

module.exports = () => {
  console.log(1);
  console.log(shell.which('sdasdas'));
  if (!shell.which('sdasdas')) {
    console.log(2);
    shell.echo(`${chalk.bold.redBright('Git is not installed')}`);
    return false;
  }
  console.log(3);
  return true;
};
