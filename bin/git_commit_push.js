#! /usr/bin/env node
const shell = require('shelljs');
const getCurrentBranch = require('./helpers/get_current_branch');
const gitCommit = require('./git/git_commit');
const gitPush = require('./git/git_push');

const args = process.argv.slice(2);
const argsString = args.join(' ');
const branchName = getCurrentBranch(shell);

gitCommit(argsString, (commitMessage) => {
  console.log(commitMessage);
  gitPush(branchName, [], (pushMessage) => {
    console.log(pushMessage);
  });
});
