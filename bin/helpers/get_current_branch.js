#! /usr/bin/env node

module.exports = shell => shell.exec('git rev-parse --abbrev-ref HEAD');
