#! /usr/bin/env node
const shell = require('shelljs');
const chalk = require('chalk');
// SET SILENT TRUE SO THAT DEFAULT OUTPUT IS NOT PRINTED ON CONSOLE
shell.config.silent = true;
// get command line argument for commit message
const args = process.argv.slice(2);
