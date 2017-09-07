#! /usr/bin/env node
const shell = require('shelljs');
const chalk = require('chalk');

shell.config.silent = true;
const args = process.argv.slice(2);

const getSpaceDelimitedValue = (string, initIndex) => string.substr(initIndex || 0, string.indexOf(' ') - (initIndex || 0));

const getFileChangedMessage = commitDetails => `${chalk.yellow('Files Changed\t: ', getSpaceDelimitedValue(commitDetails[0]))}`;

const getInsertMessage = commitMessage => `${chalk.green('Insertions\t: ', getSpaceDelimitedValue(commitMessage))}`;

const getDeleteMessage = commitMessage => `${chalk.redBright('Deletions\t: ', getSpaceDelimitedValue(commitMessage))}`;

const getInsertAndDeleteMessage = commitDetails => `${getInsertMessage(commitDetails[1])}\n${getDeleteMessage(commitDetails[2])}`;

const getFilesMessage = (commitDetails) => {
  let filesMessage = '';
  let filesAdded = '';
  const filesRenamed = '';
  let filesRemoved = '';
  commitDetails.forEach((message) => {
    if (message.indexOf('create') !== -1) {
      const splittedMessage = message.split(' ').slice(3).join(' ');
      filesAdded += `${chalk.green(' -', splittedMessage)}`;
    } else if (message.indexOf('delete') !== -1) {
      const splittedMessage = message.split(' ').slice(3).join(' ');
      filesRemoved += `${chalk.redBright(' -', splittedMessage)}`;
    } else if (message.indexOf('rename')) {
      const b = '';
    }
  });
  if (filesAdded) {
    filesMessage += `${chalk.green('Files Added:')}\n${filesAdded}`;
  }
  if (filesRemoved) {
    filesMessage += `${chalk.redBright('Files Removed:')}\n${filesRemoved}`;
  }
  return filesMessage;
};

const getChangesMessage = (commitDetails) => {
  let output = '';
  const changeDetails = commitDetails.slice(1, 3);
  changeDetails.forEach((change) => {
    if (change.indexOf('insertion') !== -1) {
      output += `\n${getInsertMessage(change)}`;
    } else if (change.indexOf('deletion') !== -1) {
      output += `\n${getDeleteMessage(change)}`;
    }
  });
  return output;
};

if (!args.length) {
  console.log(chalk.redBright('No commit message provided'));
} else {
  // exa. [ft/commit d525baa] color changed\n 1 file changed, 1 insertion(+)\n
  const result = shell.exec(`git add -A . && git commit -a -m '${args[0]}'`);
  let output = '';
  if (!result.stderr && !result.code) {
    // get the branch name
    const branchName = getSpaceDelimitedValue(result, 1);
    // attach branch name to output
    output = `${output}${chalk.bold.underline('Branch name\t')}: ${chalk.bold.underline(branchName)}\n`;
    // commitDetails includes additions, deletions, file added, file removed, renamed etc.
    // starts from \n and have space before every line
    const commitDetails = result.substr(result.indexOf('\n ') + 2).split(/, |\n /);
    const commitDetailLength = commitDetails.length;
    console.log({ commitDetails, commitDetailLength });
    output = `${output}${getFileChangedMessage(commitDetails)}${getChangesMessage(commitDetails, commitDetailLength)}\n${getFilesMessage(commitDetails.slice(2))}`;
    console.log(output);
  } else {
    // nothing to commit
    if (result.indexOf('nothing to commit')) {
      output = `${output}${chalk.bold.underline('Branch name\t: ', result.substr(10, result.indexOf('\n') - 10))}\n`;
      output = `${output}${chalk.redBright('Nothing to commit')}`;
      console.log(output);
    }
    console.log(chalk.redBright(result.stderr));
  }
}
