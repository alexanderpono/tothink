import "./styles.css";
import { Application } from "./Application";

const app = new Application();
document.getElementById("app").appendChild(app.view);
app.start();

try {
    module.hot.dispose(() => {
        app.destroy();
        console.log('destroyed');
    });
} catch (e) {}
