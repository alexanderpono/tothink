export interface Options {
    file: string;
}

export enum CommandID {
    default = '',
    mov = 'mov',
    print = 'print',
    unknownCommand = 'unknownCommand'
}
export interface Command {
    index: number;
    id: CommandID;
    operand1: string;
    operand2: string;
}
export const defaultCommand: Command = {
    index: 0,
    id: CommandID.default,
    operand1: '',
    operand2: ''
};

export interface Registers {
    ai: number;
}
export const defaultRegisters: Registers = {
    ai: 0
};

export interface Runtime {
    script: BaseCommand[];
    curLine: number;
    tickNo: number;
    registers: Registers;
}
export const defaultRuntime: Runtime = {
    script: [],
    curLine: 0,
    tickNo: 0,
    registers: defaultRegisters
};

export class BaseCommand implements Command {
    index = 0;
    id = CommandID.default;
    operand1 = '';
    operand2 = '';

    constructor(command: Command) {
        this.id = command.id;
        this.index = command.index;
        this.operand1 = command.operand1;
        this.operand2 = command.operand2;
    }

    execute(runtime: Runtime): Runtime {
        console.log('BaseCommand() runtime.curLine=', runtime.curLine);
        runtime.curLine++;
        return runtime;
    }
}
