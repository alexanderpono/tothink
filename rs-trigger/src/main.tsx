import { ImageBuilder } from './ImageBuilder';
import { AndNotView } from './views/AndNotView';
import { OneToTwoView } from './views/OneToTwoView';
import { RSInOutView } from './views/RSInOutView';
import { TwoToOneView } from './views/TwoToOneView';

console.log('main!');

const boxW = 60;
const boxH = 100;
const boxX = 100;
const boxY = 80;
const box2Y = 250;

let graph = ImageBuilder.create()
    .setDomTarget('UI')
    .setSize(800, 400)
    .createContext()
    .lineColor('black')
    .lineWidth(1)
    .border()
    .font('bold 15px sans-serif');

graph = new AndNotView(boxX, boxY, boxW, boxH).draw(graph);
graph = new AndNotView(boxX, box2Y, boxW, boxH).draw(graph);
graph = new OneToTwoView(boxX, boxY, boxW, boxH, box2Y).draw(graph);
graph = new TwoToOneView(boxX, boxY, boxW, boxH, box2Y).draw(graph);
graph = new RSInOutView(boxX, boxY, boxW, boxH, box2Y).draw(graph);

graph.printActions().buildImage();
