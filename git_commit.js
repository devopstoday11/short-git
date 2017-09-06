#! /usr/bin/env node
var shell = require("shelljs");
console.log(process.argv);
shell.exec("git add -A . && git commit -a -m 'gh-pages update'");
