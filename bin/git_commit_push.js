#! /usr/bin/env node
const shell = require('shelljs');
const chalk = require('chalk');
const getCurrentBranch = require('./helpers/get_current_branch');
// SET SILENT TRUE SO THAT DEFAULT OUTPUT IS NOT PRINTED ON CONSOLE
// shell.config.silent = true;
// get command line argument for commit message
const args = process.argv.slice(2);
const argsString = args.join(' ');

shell.exec(`gac ${argsString}`, (codeGAC, stdoutGAC, stderrGAC) => {
  console.log({ codeGAC, stdoutGAC, stderrGAC });
  if (stderrGAC) {
    shell.echo(chalk.redBright(stderrGAC));
    shell.exit(1);
  } else {
    shell.exec('gps', (codeGPS, stdoutGPS, stderrGPS) => {
      if (stderrGPS) {
        shell.echo(chalk.redBright(stderrGPS));
        shell.exit(1);
      }
    });
  }
});
