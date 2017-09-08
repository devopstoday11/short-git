#! /usr/bin/env node
const shell = require('shelljs');
const chalk = require('chalk');
const getCurrentBranch = require('./helpers/get_current_branch');
// SET SILENT TRUE SO THAT DEFAULT OUTPUT IS NOT PRINTED ON CONSOLE
shell.config.silent = true;
// get command line argument for commit message
const args = process.argv.slice(2);
let branchName = getCurrentBranch(shell);
// remove \n from the end
branchName = branchName.substr(0, branchName.length - 1);

let command = 'git push';
switch (args.length) {
  case 0:
    command += ` origin ${branchName}`;
    break;
  case 1:
    command += ` origin ${args[0]}`;
    break;
  case 2:
    command += ` ${args[0]} ${args[1]}`;
    break;
  default:
    console.log('Invalid arguments for the command');
    shell.exit(1);
}

console.log({ command });
shell.exec(command, (code, stdout, stderr) => {
  console.log({ code, stdout, stderr });
  if (stderr) {
    shell.echo(chalk.redBright(stderr));
    shell.exit(1);
  }
});
