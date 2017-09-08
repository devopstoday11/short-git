const shell = require('shelljs');
const chalk = require('chalk');

module.expoerts = () => {
  console.log(1);
  if (!shell.which('gitdsdf')) {
    console.log(2);
    shell.echo(`${chalk.bold.redBright('Git is not installed')}`);
    return false;
  }
  console.log(3);
  return true;
};
