#! /usr/bin/env node
const shell = require('shelljs');
const chalk = require('chalk');

shell.config.silent = true;
const args = process.argv.slice(2);

const getSpaceDelimitedValue = (string, initIndex) => string.substr(initIndex || 0, string.indexOf(' '));

const getFileChangedMessage = commitDetails => `${chalk.brightBlue('Files Changed\t: ', getSpaceDelimitedValue(commitDetails[0]))}`;
const getInsertMessage = commitMessage => `${chalk.green('Insertions\t: ', getSpaceDelimitedValue(commitMessage))}`;
const getDeleteMessage = commitMessage => `${chalk.red('Deletions\t: ', getSpaceDelimitedValue(commitMessage))}`;
const getInsertAndDeleteMessage = commitDetails => `${getInsertMessage(commitDetails[1])}\n${getDeleteMessage(commitDetails[2])}`;

const getChangesMessage = (commitDetails, commitDetailLength) => {
  if (commitDetailLength === 2) {
    if (commitDetails[1].indexOf('deletion') !== -1) {
      return getInsertMessage(commitDetails[1]);
    }
    return getDeleteMessage(commitDetails[1]);
  }
  return getInsertAndDeleteMessage(commitDetails);
};

if (!args.length) {
  console.log(chalk.red('No commit message provided'));
} else {
  const result = shell.exec(`git add -A . && git commit -a -m '${args[0]}'`);
  let output = '';
  if (!result.stderr) {
    const branchName = getSpaceDelimitedValue(result, 1);
    output = `${output}${chalk.bold('Branch name\t: ', branchName)}\n`;
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
      case 3:
        output = `${output}${getFileChangedMessage(commitDetails)}\n${getChangesMessage(commitDetails, commitDetailLength)}`;
        console.log(chalk`${output}`);
        break;
      default:
    }
  } else {
    console.log(chalk.red(result.stderr));
  }
}
