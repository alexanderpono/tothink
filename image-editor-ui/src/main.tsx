import { AppController, GoError } from './AppController';
import { Stragegy } from './AppController.types';
// import { AppController, Stragegy } from './AppController';
import React from 'react';
import { render } from 'react-dom';
import { Scroll } from './Scroll';

console.log('main!');

const appCtrl = new AppController();
// appCtrl.go(Stragegy.INIT_FROM_APP);
if (appCtrl.go(Stragegy.INIT_FROM_STORAGE) === GoError.DOC_GET_ERROR) {
    appCtrl.go(Stragegy.INIT_FROM_APP);
}
// appCtrl.go(Stragegy.INIT_FROM_STORAGE);

// render(
//     <div>
//         <Scroll onUpdate={(p) => console.log('p=', p)}>aaa adjf lk dflak sdfaslkdfalks dfkla sdflakh dsfka hkldf haklhfd alkdjh fkahj </Scroll>
//     </div>,
//     document.getElementById('UI2')
// );
