#! /usr/bin/env node
const shell = require('shelljs');
const chalk = require('chalk');
// SET SILENT TRUE SO THAT DEFAULT OUTPUT IS NOT PRINTED ON CONSOLE
shell.config.silent = true;
// get command line argument for commit message
module.exports = (branchName, args, callback) => {
  // remove \n from the end
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
      callback(chalk.redBright('Invalid arguments'));
      return;
  }
  shell.exec(command, (code, stdout, stderr) => {
    if (stderr) {
      // get hash
      // example:
      // To https://github.com/ridhamtarpara/short-git.git
      //   9ae2336..9835655  ft/push -> ft/push
      let commitHash = stderr.substr(stderr.indexOf('..') + 2);
      commitHash = commitHash.substr(0, commitHash.indexOf('  '));
      let url = stderr.substr(3, stderr.indexOf('\n') - 7);
      url = `${url}/commit/${commitHash}`;
      callback(`${chalk.greenBright('Push Successfull')}\nLink : ${url}`);
      return;
    }
    callback(chalk.greenBright(stdout));
  });
};
