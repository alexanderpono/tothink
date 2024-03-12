import { program } from 'commander';
import { Options } from './machine.types';
const { description, name, version } = require('../package.json');
import axios from 'axios';
import fs from 'fs';
import stream from 'stream';
import util from 'util';
import FormData from 'form-data';
import path from 'path';

program
    .name(name)
    .version(version)
    .description(description)
    .option('-f, --file <file>', 'script file name')
    .parse(process.argv);

const options: Options = program.opts();
if (Object.keys(options).length === 0) {
    program.help();
}

switch (options.command) {
    case 'file': {
        console.log('file');
        break;
    }

    default: {
        console.log('CLI: unknown command', options.command);
    }
}
