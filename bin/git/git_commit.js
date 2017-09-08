const shell = require('shelljs');
const chalk = require('chalk');

shell.config.silent = true;

const args = process.argv.slice(2);
const finalCommitMessage = args.join(' ') || 'Auto commit';
const getBranchName = branchName => `${chalk.bold.underline('Branch name\t')}: ${chalk.bold.underline(branchName)}`;

const getSpaceDelimitedValue = (string, initIndex) => string.substr(initIndex || 0, string.indexOf(' ') - (initIndex || 0));

const getFileChangedMessage = commitDetails => `${chalk.yellow('Files Changed\t: ', getSpaceDelimitedValue(commitDetails[0]))}`;

const getInsertMessage = commitMessage => `${chalk.green('Insertions\t: ', getSpaceDelimitedValue(commitMessage))}`;

const getDeleteMessage = commitMessage => `${chalk.redBright('Deletions\t: ', getSpaceDelimitedValue(commitMessage))}`;

/**
 * Generate message for created, deleted and renamed files
 * param {Array} [commitDetails] array of commit messages from index 2 to end.
 * @returns {String} created, deleted and renamed files message formatted string.
 */
const getFilesMessage = (commitDetails) => {
  let filesMessage = '';
  let filesAdded = '';
  let filesRenamed = '';
  let filesRemoved = '';
  commitDetails.forEach((message) => {
    if (message.indexOf('create') !== -1) {
      // get file name
      // exa. delete mode 100644 mmm.js
      const splittedMessage = message.split(' ').slice(3).join(' ');
      filesAdded += `\n${chalk.green(' -', splittedMessage)}`;
    } else if (message.indexOf('delete') !== -1) {
      const splittedMessage = message.split(' ').slice(3).join(' ');
      filesRemoved += `\n${chalk.red(' -', splittedMessage)}`;
    } else if (message.indexOf('rename') !== -1) {
      // exam. rename ddd.js => ddd_isdas.js (100%)\n
      const arrowIndex = message.indexOf('=>');
      const percentIndex = message.indexOf('(100%)');
      const firstFileName = message.substr(7, arrowIndex - 7);
      const secondFileName = message.substr(arrowIndex + 3, percentIndex - arrowIndex - 3);
      filesRenamed += `\n${chalk.yellow(' -', firstFileName, '=>', secondFileName)}`;
    }
  });
  if (filesAdded) {
    filesMessage += `\n${chalk.greenBright('Files Added:')}${filesAdded}`;
  }
  if (filesRemoved) {
    filesMessage += `\n${chalk.redBright('Files Removed:')}${filesRemoved}`;
  }
  if (filesRenamed) {
    filesMessage += `\n${chalk.yellowBright('Files Renamed:')}${filesRenamed}`;
  }
  return `\n${filesMessage}`;
};

/**
 * Generate message for number of insertion and deletions
 * param {Array} [commitDetails] array of commit messages.
 * @returns {String} insertion and deletion message formatted string.
 */
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

// If no arguments


module.exports = (message) => {
  // exa. [ft/commit d525baa] color changed\n 1 file changed, 1 insertion(+)\n
  const result = shell.exec(`git add -A . && git commit -a -m '${finalCommitMessage || 'Auto commit'}'`);
  let output = '';
  if (!message) {
    output += `${chalk.redBright('No commit message provided. Using default message \'Auto commit\'')}\n`;
  }
  if (!result.stderr && !result.code) {
    // get the branch name
    const branchName = getSpaceDelimitedValue(result, 1);
    // attach branch name to output
    output = `${output}${getBranchName(branchName)}\n`;
    // commitDetails includes additions, deletions, file added, file removed, renamed etc.
    // starts from \n and have space before every line
    const commitDetails = result.substr(result.indexOf('\n ') + 2).split(/, |\n /);
    const commitDetailLength = commitDetails.length;
    output = `${output}${getFileChangedMessage(commitDetails)}${getChangesMessage(commitDetails, commitDetailLength)}${getFilesMessage(commitDetails.slice(2))}`;
    return output;
  }
  // nothing to commit
  if (result.indexOf('nothing to commit')) {
    output = `${output}${getBranchName(result.substr(10, result.indexOf('\n') - 10))}\n`;
    output = `${output}${chalk.redBright('Nothing to commit')}`;
    return output;
  }
  return 'chalk.redBright(result.stderr)';
};
