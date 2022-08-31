import "./styles.css";
import { Application } from "./Application";

const app = new Application();
document.getElementById("app").appendChild(app.view);
app.start();