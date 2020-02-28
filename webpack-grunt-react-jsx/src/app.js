import React from 'react';
import ReactDOM from 'react-dom';
import App from "./component/app.component";



document.addEventListener("DOMContentLoaded", ready);

function ready() {

    // ReactDOM.render(
    //     React.createElement(App, null, null), 
    //     document.getElementById('app-target')
    // );

    ReactDOM.render(<App />, document.querySelector("#app-target"));
}

