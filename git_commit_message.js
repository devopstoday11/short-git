#! /usr/bin/env node
const shell = require("shelljs");
const chalk = require('chalk');

const args = process.argv.slice(2);
console.log(args);
if (!args.length) {
  console.log(chalk.red('No commit message provided'));
} else {
  let data = shell.exec(`git add -A . && git commit -a -m '${args[0]}'`);
  console.log('\n\n',data,'\n\n' ,data.stdout);
}
