import { BaseCommand, Runtime } from './machine.types';

export class DefaultCommand extends BaseCommand {
    execute(runtime: Runtime): Runtime {
        // console.log('DefaultCommand() runtime.curLine=', runtime.curLine);
        runtime.curLine++;
        return runtime;
    }
}
