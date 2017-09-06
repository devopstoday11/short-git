#! /usr/bin/env node
var shell = require("shelljs");

var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);

shell.exec("git add -A . && git commit -a -m 'gh-pages update'");
