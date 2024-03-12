import { BaseCommand, Runtime } from './machine.types';

export class MovCommand extends BaseCommand {
    execute(runtime: Runtime): Runtime {
        // console.log('MovCommand() runtime.curLine=', runtime.curLine);
        if (this.operand1 === 'ai') {
            runtime.registers.ai = parseInt(this.operand2);
        }
        runtime.curLine++;
        return runtime;
    }
}
