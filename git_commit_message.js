#! /usr/bin/env node
const shell = require("shelljs");
const chalk = require('chalk');

const args = process.argv.slice(2);
console.log(args);
if (!args.length) {
  console.log(chalk.red('No commit message provided'));
} else {
  shell.exec(`git add -A . && git commit -a -m '${args[0]}'`);
  console.log(shell.exec('git status'));
}
