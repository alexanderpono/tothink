import { exec } from 'child_process';
import path from 'path';

const run = (params: string) => {
    return new Promise((resolve) => {
        const app = `ts-node --project ./tsconfig.json -r tsconfig-paths/register ./src/machine.ts ${params}`;
        // const app = `node ./temp/build/machine.js ${params}`;

        exec(app, function callback(error, stdout, stderr) {
            resolve(stdout);
        });
    });
};

describe('cli', () => {
    beforeAll(async () => {
        await run('-c reset');
    });

    const help = `Usage: machine [options]

Options:
  -V, --version      output the version number
  -f, --file <file>  script file name
  -h, --help         display help for command`;

    describe('CLI', () => {
        test.each`
            cli    | params                        | testName                        | expected
            ${run} | ${''}                         | ${'prints help from no params'} | ${help}
            ${run} | ${'-f cli-tests/scripts/1.s'} | ${'prints 1'}                   | ${'1'}
        `('$testName', async ({ cli, params, expected }) => {
            const r = await cli(params);
            expect(r.trim()).toEqual(expected);
        });
    });
});
