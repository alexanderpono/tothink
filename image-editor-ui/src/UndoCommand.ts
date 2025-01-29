import { AppFactory } from './AppFactory';
import { RunScriptCommand } from './RunScriptCommand';

export class UndoCommand {
    constructor(protected factory: AppFactory, protected runScript: RunScriptCommand) {}

    getNewUndoneIndex = (index: number) => --index;

    hasSomethingToDo(undoneIndex): boolean {
        if (undoneIndex === 0) {
            console.log('nothing to undo');
            return false;
        }
        return true;
    }

    do() {
        const appStorage = this.factory.getStorage();
        let historyS = appStorage.getHistory();
        let history = [];
        try {
            history = JSON.parse(historyS);
        } catch {
            console.error('error parsing history=', historyS);
            return;
        }

        const undoneIndexS = appStorage.getUndoneIndex();
        let undoneIndex = parseInt(undoneIndexS);
        if (isNaN(undoneIndex) || undoneIndex < 0 || undoneIndex > history.length) {
            undoneIndex = history.length;
        }

        if (!this.hasSomethingToDo(undoneIndex)) {
            return;
        }

        const historyDocS = appStorage.getHistoryDoc();
        let historyDoc = null;
        try {
            historyDoc = JSON.parse(historyDocS);
        } catch {
            console.error('error parsing historyDoc=', historyDocS);
            return;
        }

        undoneIndex = this.getNewUndoneIndex(undoneIndex);
        this.factory.initFromDocument(historyDoc);
        const historyTodo = history.slice(0, undoneIndex);
        this.runScript.runScript(historyTodo);
        appStorage.setUndoneIndex('' + undoneIndex);
    }
}
