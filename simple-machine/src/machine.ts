import { program } from 'commander';
import { Options } from './machine.types';
const { description, name, version } = require('../package.json');
import fs from 'fs';
import path from 'path';
import { MachineConstoller } from './MachineController';

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

function main() {
    const file = path.join(__dirname, options.file);
    // console.log('file=', file);
    const scriptText = fs.readFileSync(file, { encoding: 'utf8' });
    // console.log('scriptText=', scriptText);

    const machine = new MachineConstoller();
    const script = machine.compile(scriptText);
    // console.log('script=', script);

    const errors = machine.validateScript(script);
    if (errors.length) {
        console.log(errors.join('\n'));
        return;
    }

    machine.execScript(script);
}

main();
