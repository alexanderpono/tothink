import { AppControllerForScript } from '@src/AppController.types';
import { AppFactory } from '@src/AppFactory';

export class ScriptApp {
    constructor(private _factory: AppFactory, private _ctrl: AppControllerForScript) {}
}
