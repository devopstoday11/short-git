#! /usr/bin/env node

module.exports = (shell) => {
  const branchName = shell.exec('git rev-parse --abbrev-ref HEAD');
  return branchName.substr(0, branchName.length - 1);
};
