import { UndoCommand } from './UndoCommand';

export class RedoCommand extends UndoCommand {
    getNewUndoneIndex = (index: number) => ++index;

    hasSomethingToDo(undoneIndex): boolean {
        if (undoneIndex >= history.length) {
            console.log('nothing to redo');
            return false;
        }

        return true;
    }
}
