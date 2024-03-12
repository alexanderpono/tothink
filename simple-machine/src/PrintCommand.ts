import { RuntimeError } from './RuntimeError';
import { BaseCommand, Runtime } from './machine.types';

export class PrintCommand extends BaseCommand {
    execute(runtime: Runtime): Runtime {
        // console.log('PrintCommand() this=', this);
        if (this.operand1 === 'ai') {
            console.log(runtime.registers.ai);
        } else {
            throw new RuntimeError(`PrintCommand: unknown operand1 ${this.operand1}`, runtime);
        }
        runtime.curLine++;
        return runtime;
    }
}
