import { WinControllerForScript } from '@src/WindowController.types';

export class ScriptWin {
    constructor(private _ctrl: WinControllerForScript) {}

    scrollX = (dx: number) => this._ctrl.scrollX(dx);
    scrollY = (dy: number) => this._ctrl.scrollY(dy);
    setSize = (width: number, height: number) => this._ctrl.setSize(width, height);
}
