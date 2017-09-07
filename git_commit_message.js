#! /usr/bin/env node
const shell = require('shelljs');
const chalk = require('chalk');

shell.config.silent = true;
const args = process.argv.slice(2);

const getSpaceDelimitedValue = (string, initIndex) => string.substr(initIndex || 0, string.indexOf(' '));

const getFileChangedMessage = commitDetails => `${chalk.blueBright('Files Changed\t: ', getSpaceDelimitedValue(commitDetails[0]))}`;
const getInsertMessage = commitMessage => `${chalk.greenBright('Insertions\t: ', getSpaceDelimitedValue(commitMessage))}`;
const getDeleteMessage = commitMessage => `${chalk.redBright('Deletions\t: ', getSpaceDelimitedValue(commitMessage))}`;
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
	// exa. [ft/commit d525baa] color changed\n 1 file changed, 1 insertion(+)\n
  const result = shell.exec(`git add -A . && git commit -a -m '${args[0]}'`);
  let output = '';
  console.log(result);
  if (!result.stderr && !result.code) {
		// get the branch name
    const branchName = getSpaceDelimitedValue(result, 1);
		// attach branch name to output
    output = `${output}${chalk.bold('Branch name\t: ', branchName)}\n`;
		// commitDetails includes additions, deletions, file added, file removed, renamed etc.
		// starts from \n and have space before every line
    const commitDetails = result.substr(result.indexOf('\n ') + 2).split(/, |\n /);
    const commitDetailLength = commitDetails.length;
    console.log({ commitDetails, commitDetailLength });
    switch (commitDetailLength) {
      case 1:
        output = `${output}${chalk.bold(commitDetails[0].sunstr(0, commitDetails[0].indexOf(' ')))}`;
        console.log(chalk`${output}`);
        break;
			// If only addition and deletions
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
