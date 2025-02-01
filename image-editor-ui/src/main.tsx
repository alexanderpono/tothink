import { AppController, GoError } from './AppController';
import { Stragegy } from './AppController.types';

console.log('main!');

const appCtrl = new AppController();
// appCtrl.go(Stragegy.INIT_FROM_APP);
if (appCtrl.go(Stragegy.INIT_FROM_STORAGE) === GoError.DOC_GET_ERROR) {
    appCtrl.go(Stragegy.INIT_FROM_APP);
}
