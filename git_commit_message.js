#! /usr/bin/env node
const shell = require("shelljs");
const chalk = require('chalk');

const args = process.argv.slice(2);
console.log(args);
if (!args.length) {
  console.log(chalk.red('No commit message provided'));
} else {
  let result = shell.exec(`git add -A . && git commit -a -m '${args[0]}'`);
  if (!result.stderr) {
    console.log(chalk.green(result.stdout));
  } else {
    console.log(chalk.red(result.stderr));
  }
}
