#! /usr/bin/env node
const shell = require('shelljs');
const chalk = require('chalk');

shell.config.silent = true;
const args = process.argv.slice(2);

if (!args.length) {
  console.log(chalk.red('No commit message provided'));
} else {
  const result = shell.exec(`git add -A . && git commit -a -m '${args[0]}'`);
  let output = '';
  if (!result.stderr) {
    const branchName = result.substr(1, result.indexOf(' ') - 1);
    output = `${output}${chalk.bold.green(branchName)}\n`;
    const newLineIndex = result.indexOf('\n ');
    const commitDetails = result.substr(newLineIndex + 2).split(/, |\n /);
    const commitDetailLength = commitDetails.length;
    console.log({ commitDetails, commitDetailLength });
    switch (commitDetailLength) {
      case 1:
        output = `${output}${chalk.bold(commitDetails[0].sunstr(0, commitDetails[0].indexOf(' ')))}`;
        console.log(chalk`${output}`);
        break;
      case 2:
        output = `${output}Files Changed\t:${chalk.bold(commitDetails[0].substr(0, commitDetails[0].indexOf(' ')))}`;
        console.log(chalk`${output}`);
        break;
      case 3:
        output = `${output}Files Changed\t:${chalk.bold(commitDetails[0].substr(0, commitDetails[0].indexOf(' ')))}`;
        console.log(chalk`${output}`);
        break;
      default:
    }
  } else {
    console.log(chalk.red(result.stderr));
  }
}
