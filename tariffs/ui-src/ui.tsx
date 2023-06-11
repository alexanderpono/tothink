import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { UserPageController } from './UserPageController';

render(<App />, document.getElementById('ui-target'));

const userPage = new UserPageController();
console.log('userPage=', userPage);