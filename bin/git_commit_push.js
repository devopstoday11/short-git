#! /usr/bin/env node
const shell = require('shelljs');
const chalk = require('chalk');
const getCurrentBranch = require('./helpers/get_current_branch');
const gitCommit = require('./git/git_commit');
const gitPush = require('./git/git_push');
// SET SILENT TRUE SO THAT DEFAULT OUTPUT IS NOT PRINTED ON CONSOLE
// shell.config.silent = true;
// get command line argument for commit message
console.log('================================');
const args = process.argv.slice(2);
const argsString = args.join(' ');
const branchName = getCurrentBranch(shell);
gitCommit(argsString, (commitMessage) => {
  console.log(111);
  gitPush(branchName, args, (pushMessage) => {
    console.log(222);
  });
});
// shell.exec(`gac ${argsString}`, (codeGAC, stdoutGAC, stderrGAC) => {
//   console.log({ codeGAC, stdoutGAC, stderrGAC });
//   console.log(22);
//   if (stderrGAC) {
//     shell.echo(chalk.redBright(stderrGAC));
//     shell.exit(1);
//   } else {
//     console.log(33);
//     shell.exec('gps', (codeGPS, stdoutGPS, stderrGPS) => {
//       console.log(44);
//       if (stderrGPS) {
//         shell.echo(chalk.redBright(stderrGPS));
//         shell.exit(1);
//       }
//     });
//   }
// });
