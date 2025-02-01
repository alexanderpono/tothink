import { GoError } from './AppController';
import { AppControllerForScript, Stragegy } from './AppController.types';
import { AppFactory } from './AppFactory';
import { DocumentModel } from './DocumentModel';
import { ScriptWin } from './script/ScriptWin';
import { defaultEditorWindow, EditorWindow } from './WindowController.types';

export class WindowController {
    private win: EditorWindow = { ...defaultEditorWindow };

    constructor(
        private factory: AppFactory,
        private model: DocumentModel,
        private _app: AppControllerForScript
    ) {}

    go = (strategy: Stragegy) => {
        const appStorage = this.factory.getStorage();
        if (strategy !== Stragegy.INIT_FROM_APP) {
            const winString = appStorage.getWin();

            console.log('winString=', winString);

            let win = null;
            if (typeof winString === 'string') {
                try {
                    win = JSON.parse(winString);
                } catch {
                    console.log('error parsing win');
                }
            } else {
                console.log('error getting win from storage');
                return GoError.WIN_GET_ERROR;
            }

            if (!this.isWinValid(win)) {
                console.log('win is not valid', win);
                GoError.WIN_GET_ERROR;
            }
            console.log('win=', win);
            this.win = win;

            window['win'] = new ScriptWin(this);
        }

        this.updateStore();
    };

    isWinValid = (win: EditorWindow) => true;
    getWin = () => this.win;

    updateStore = () => {
        this.factory.getStorage().setWin(JSON.stringify(this.win));
    };

    scrollX = (dx: number) => {
        this.win.scrollX += dx;
        this.updateStore();
        this._app.onWinUpdate();
    };

    scrollY = (dy: number) => {
        this.win.scrollY += dy;
        this.updateStore();
        this._app.onWinUpdate();
    };

    setSize = (width: number, height: number) => {
        this.win.width = width;
        this.win.height = height;
        this.updateStore();
        this._app.onWinUpdate();
    };
}
