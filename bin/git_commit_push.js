#! /usr/bin/env node
const shell = require('shelljs');
const chalk = require('chalk');
const getCurrentBranch = require('./helpers/get_current_branch');
const gitCommit = require('./git/git_commit');
const gitPush = require('./git/git_push');
// SET SILENT TRUE SO THAT DEFAULT OUTPUT IS NOT PRINTED ON CONSOLE
// shell.config.silent = true;
// get command line argument for commit message
const args = process.argv.slice(2);
const argsString = args.join(' ');
const branchName = getCurrentBranch(shell);
gitCommit(argsString, (commitMessage) => {
  console.log(commitMessage);
  gitPush(branchName, [], (pushMessage) => {
    console.log(pushMessage);
  });
});
