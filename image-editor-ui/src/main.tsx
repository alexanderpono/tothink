import { AppFactory } from './AppFactory';
import { ImageBuilder } from './ImageBuilder';

console.log('main!');

let graph = ImageBuilder.create().setDomTarget('UI');

const app = new AppFactory();
app.createModel();

const document = app.createDocument().setSize(800, 400);

app.createImageResource('sprites', 'sprite.png');

app.createLayer().setSprite('sprites', 0, 0, 40, 40).moveTo(0, 0);
app.createLayer().setSprite('sprites', 0, 0, 480, 200).moveTo(320, 200);

console.log('model=', app.getModel());
console.log('doc=', app.getModel().toJSON());

document.render(graph).then((graph) => {
    graph.lineColor('black').lineWidth(1).border();
    graph.printActions().buildImage();
});
