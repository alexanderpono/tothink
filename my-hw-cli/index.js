#!/usr/bin/env node

const package_json = require('./package.json');

let processed = false;
if (process.argv.findIndex((item) => item === '--version') >= 0) {
    console.log('version ' + package_json.version);
    processed = true;
}

if (process.argv.findIndex((item) => item === '--help') >= 0) {
    console.log(`
mw-hw-cli

Package version
${package_json.version}

Package description
${package_json.description}

Usage
--help    Help documentation
--version Installed package version
    `);
    processed = true;
}

if (processed) {
    return;
}

console.log('Hello CLI');
console.log(process.argv);

