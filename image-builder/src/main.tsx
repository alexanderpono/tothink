import { ImageAction, ImageBuilder } from './ImageBuilder';
import { SimFactory } from './sim/SimFactory';
import { Action, sim } from './sim/simReducer';

console.log('main!');

const step1: Action[] = [
    sim.putIntoSlot('owner', 'rsTrigger.in.S', 1),
    sim.putIntoSlot('owner', 'rsTrigger.in.R', 1),
    sim.putIntoSlot('owner', 'andNot1.out.out', 0),
    sim.runSwitcher(),
    sim.incStep()
];

const step2: Action[] = [sim.recalcObjects(), sim.runSwitcher(), sim.incStep()];
const step3: Action[] = [sim.recalcObjects(), sim.runSwitcher(), sim.incStep()];

const simActions: Action[] = [...step1, ...step2, ...step3];
const renderActions = [
    { type: 'SET_SIZE', w: 800, h: 400 },
    { type: 'CREATE_CONTEXT' },
    { type: 'LINE_COLOR', color: 'black' },
    { type: 'LINE_WIDTH', width: 1 },
    { type: 'BORDER' },
    { type: 'FONT', font: 'bold 15px sans-serif' },
    { type: 'LINE_COLOR', color: 'black' },
    { type: 'BOX', x0: 100, y0: 80, w: 60, h: 100 },
    { type: 'H_LINE', x0: 80, y0: 100, len: 20 },
    { type: 'H_LINE', x0: 160, y0: 130, len: 20 },
    { type: 'H_LINE', x0: 80, y0: 160, len: 20 },
    { type: 'FILL_COLOR', color: 'white' },
    { type: 'DRAW_CIRCLE', xPos: 160, yPos: 130, radius: 5 },
    { type: 'FILL_COLOR', color: 'black' },
    { type: 'TEXT', x: 140, y: 100, text: '&' },
    { type: 'TEXT', x: 85, y: 95, text: '1' },
    { type: 'TEXT', x: 85, y: 154, text: '?' },
    { type: 'TEXT', x: 167, y: 124, text: '0' },
    { type: 'LINE_COLOR', color: 'red' },
    { type: 'BOX', x0: 100, y0: 250, w: 60, h: 100 },
    { type: 'H_LINE', x0: 80, y0: 270, len: 20 },
    { type: 'H_LINE', x0: 160, y0: 300, len: 20 },
    { type: 'H_LINE', x0: 80, y0: 330, len: 20 },
    { type: 'FILL_COLOR', color: 'white' },
    { type: 'DRAW_CIRCLE', xPos: 160, yPos: 300, radius: 5 },
    { type: 'FILL_COLOR', color: 'red' },
    { type: 'TEXT', x: 140, y: 270, text: '&' },
    { type: 'TEXT', x: 85, y: 265, text: '0' },
    { type: 'TEXT', x: 85, y: 324, text: '1' },
    { type: 'TEXT', x: 167, y: 294, text: '1' },
    { type: 'LINE_COLOR', color: 'red' },
    { type: 'V_LINE', x0: 180, y0: 130, len: 60 },
    { type: 'LINE', x0: 180, y0: 190, x1: 80, y1: 240 },
    { type: 'V_LINE', x0: 80, y0: 240, len: 30 },
    { type: 'LINE_COLOR', color: 'black' },
    { type: 'V_LINE', x0: 180, y0: 300, len: -60 },
    { type: 'LINE', x0: 180, y0: 240, x1: 80, y1: 190 },
    { type: 'V_LINE', x0: 80, y0: 190, len: -30 },
    { type: 'LINE_COLOR', color: 'black' },
    { type: 'FILL_COLOR', color: 'black' },
    { type: 'H_LINE', x0: 60, y0: 100, len: 20 },
    { type: 'H_LINE', x0: 180, y0: 130, len: 40 },
    { type: 'DRAW_CIRCLE', xPos: 180, yPos: 130, radius: 3 },
    { type: 'H_LINE', x0: 60, y0: 330, len: 20 },
    { type: 'H_LINE', x0: 180, y0: 300, len: 40 },
    { type: 'DRAW_CIRCLE', xPos: 180, yPos: 300, radius: 3 },
    { type: 'TEXT', x: 40, y: 105, text: 'S' },
    { type: 'TEXT', x: 40, y: 335, text: 'R' },
    { type: 'TEXT', x: 230, y: 135, text: 'Q' },
    { type: 'TEXT', x: 230, y: 305, text: 'Q' },
    { type: 'H_LINE', x0: 231, y0: 292, len: 10 }
];

// const app = SimFactory.create().createAppController();
// app.go(simActions);

let graph = ImageBuilder.create().setDomTarget('UI');
// .setSize(800, 400)
// .createContext()
// .lineColor('black')
// .lineWidth(1)
// .border()
// .font('bold 15px sans-serif');

graph
    .addActions(renderActions as ImageAction[])
    .printActions()
    .buildImage();
