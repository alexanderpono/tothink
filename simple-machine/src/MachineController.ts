import { DefaultCommand } from './DefaultCommand';
import { MovCommand } from './MovCommand';
import { PrintCommand } from './PrintCommand';
import {
    BaseCommand,
    Command,
    CommandID,
    Runtime,
    defaultCommand,
    defaultRuntime
} from './machine.types';

export class MachineConstoller {
    compile = (script: string): BaseCommand[] => {
        const lines = script.split('\n');
        // console.log('lines=', lines);

        const commands = lines.map(this.compileCommand);
        // const delEmpty = lines.filter((s) => s.trim() !== '');
        // console.log('commands=', commands);
        return commands;
    };

    compileCommand = (line: string, index: number): BaseCommand => {
        const tokens = line.split(',');
        switch (tokens[0]) {
            case CommandID.mov: {
                return new MovCommand({
                    index,
                    id: CommandID.mov,
                    operand1: tokens[1],
                    operand2: tokens[2]
                });
            }
            case CommandID.print: {
                return new PrintCommand({
                    ...defaultCommand,
                    index,
                    id: CommandID.print,
                    operand1: tokens[1]
                });
            }
            case '': {
                return new DefaultCommand({
                    ...defaultCommand,
                    index
                });
            }
            default: {
                return new DefaultCommand({
                    ...defaultCommand,
                    index,
                    id: CommandID.unknownCommand,
                    operand1: line
                });
            }
        }
    };

    validateScript = (script: Command[]): string[] => {
        const unknownCommands = script.filter((command) => command.id === CommandID.unknownCommand);
        if (unknownCommands.length > 0) {
            return unknownCommands.map(
                (command) => `line:${command.index} ${command.operand1} UNKOWN COMMAND`
            );
        }
        return [];
    };

    execScript = (script: BaseCommand[]) => {
        let runtime: Runtime = { ...defaultRuntime, script };
        const MAX_STEP = 100;
        let tickNo = 1;

        while (tickNo < MAX_STEP && runtime.curLine < runtime.script.length) {
            runtime = this.tick(runtime);
            runtime.tickNo = tickNo;
            tickNo++;
        }
        // console.log('execScript() finish tickNo=', tickNo);
        // console.log('execScript() finish machineState=', {
        //     ...runtime,
        //     script: runtime.script.map((cmd) => ({
        //         index: cmd.index,
        //         id: cmd.id,
        //         operand1: cmd.operand1,
        //         operand2: cmd.operand2
        //     }))
        // });
    };

    tick = (runtime: Runtime) => {
        const command = runtime.script[runtime.curLine];
        // console.log('tick command.index=', command.index, command.id);
        const newRuntime = command.execute(runtime);
        return newRuntime;
    };

    // execCommand = (command: Command) {}
}
