#! /usr/bin/env node
const shell = require('shelljs');
const chalk = require('chalk');

const args = process.argv.slice(2);
console.log(args);
if (!args.length) {
  console.log(chalk.red('No commit message provided'));
} else {
  const result = shell.exec(`git add -A . && git commit -a -m '${args[0]}'`);
  if (!result.stderr) {
    const index = result.indexOf(']');
    const branchName = result.substr(1, result.indexOf(' ') - 1);
    console.log({ branchName });

    console.log(chalk.green(result.stdout));
  } else {
    console.log(chalk.red(result.stderr));
  }
}
