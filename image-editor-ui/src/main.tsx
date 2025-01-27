import { AppController, Stragegy } from './AppController';

console.log('main!');

const appCtrl = new AppController();
// appCtrl.go(Stragegy.INIT_FROM_APP);
appCtrl.go(Stragegy.INIT_FROM_STORAGE);
