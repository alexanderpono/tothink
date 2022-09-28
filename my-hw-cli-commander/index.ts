#!/usr/bin/env ts-node
const { description, name, version } = require('./package.json');
import { program } from 'commander';

program
    .name(name)
    .version(version)
    .description(description)
    .option('-p, --peppers', 'Add peppers')
    .option('-P, --pineapple', 'Add pineapple')
    .option('-b, --bbq-sauce', 'Add bbq sauce')
    .option('-c, --cheese [type]', 'Add cheese with optional type')
    .parse(process.argv);

const options = program.opts();
if (Object.keys(options).length === 0) {
    program.help();
}


console.log('You ordered a pizza with ');
if (options.peppers) {
    console.log(' - peppers');
}
if (options.pineapple) {
    console.log(' - pineapple');
}
if (options.bbqSauce) {
    console.log(' - bbq sauce');
}

if (options.cheese === undefined) {
    console.log('no cheese');
} else if (options.cheese === true) {
    console.log('add cheese');
}
else {
    console.log(`add cheese type ${options.cheese}`);
}

