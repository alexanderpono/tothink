import { ImageBuilder } from './ImageBuilder';
import { AndNotView } from './views/AndNotView';
import { OneToTwoView } from './views/OneToTwoView';
import { RSInOutView } from './views/RSInOutView';
import { TwoToOneView } from './views/TwoToOneView';
import { defaultAndNotViewState, defaultConnectorViewState } from './views/views.types';

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

graph = new AndNotView({
    ...defaultAndNotViewState,
    x: boxX,
    y: boxY,
    w: boxW,
    h: boxH,
    showInOut: true,
    color: 'red'
}).draw(graph);

graph = new AndNotView({
    ...defaultAndNotViewState,
    x: boxX,
    y: box2Y,
    w: boxW,
    h: boxH,
    showInOut: true,
    color: 'magenta'
}).draw(graph);

graph = new OneToTwoView({
    ...defaultConnectorViewState,
    boxX,
    boxY,
    boxW,
    boxH,
    box2Y,
    color: 'green'
}).draw(graph);

graph = new TwoToOneView({
    ...defaultConnectorViewState,
    boxX,
    boxY,
    boxW,
    boxH,
    box2Y,
    color: 'blue'
}).draw(graph);

graph = new RSInOutView(boxX, boxY, boxW, boxH, box2Y).draw(graph);

graph.printActions().buildImage();
