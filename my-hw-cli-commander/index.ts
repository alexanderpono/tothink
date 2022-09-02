#!/usr/bin/env ts-node
const { description, name, version } = require('./package.json');

const options = process.argv.slice(2);
const VERSION_MESSAGE = `${name} ${version}`;
const HELP_MESSAGE = `${VERSION_MESSAGE}
${description}

Usage
--help    Help documentation
--version Installed package version

`;

if (options.includes('--version')) {
    console.log(VERSION_MESSAGE);
    process.exit(0);
} else {
    console.log(HELP_MESSAGE);
    process.exit(0);
}

