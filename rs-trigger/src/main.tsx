import { ImageBuilder } from './ImageBuilder';

console.log('main!');

const boxW = 60;
const boxH = 100;
const boxH2 = boxH / 2;
const boxX = 100;
const boxY = 80;
const box2Y = 250;
const L2 = 5;

ImageBuilder.create()
    .setDomTarget('UI')
    .setSize(800, 400)
    .createContext()
    .lineColor('black')
    .lineWidth(1)
    .border()
    .font('bold 15px sans-serif')

    .box(boxX, boxY, boxW, boxH)
    .hLine(boxX - 40, boxY + 20, 40)
    .hLine(boxX + boxW, boxY + boxH2, 60)
    .fillColor('white')
    .drawCircle(boxX + boxW, boxY + boxH2, 5)
    .fillColor('black')
    .text(boxX + boxW - 20, boxY + 20, '&')

    .box(boxX, box2Y, boxW, boxH)
    .hLine(boxX - 40, box2Y + boxH - 20, 40)
    .hLine(boxX + boxW, box2Y + boxH2, 60)
    .fillColor('white')
    .drawCircle(boxX + boxW, box2Y + boxH2, 5)
    .fillColor('black')
    .text(boxX + boxW - 20, box2Y + 20, '&')

    .fillColor('black')
    .drawCircle(boxX + boxW + 20, boxY + boxH2, 3)
    .vLine(boxX + boxW + 20, boxY + boxH2, boxH2 + 10)
    .line(boxX + boxW + 20, boxY + boxH + 10, boxX - 20, box2Y - 10)
    .vLine(boxX - 20, box2Y - 10, 30)
    .hLine(boxX - 20, box2Y + 20, 20)

    .fillColor('black')
    .drawCircle(boxX + boxW + 20, box2Y + boxH2, 3)
    .vLine(boxX + boxW + 20, box2Y + boxH2, -boxH2 - 10)
    .line(boxX + boxW + 20, box2Y - 10, boxX - 20, boxY + boxH + 10)
    .vLine(boxX - 20, boxY + boxH + 10, -30)
    .hLine(boxX - 20, boxY + boxH - 20, 20)

    .text(boxX - 60, boxY + 20 + L2, 'S')
    .text(boxX - 60, box2Y + boxH - 20 + L2, 'R')
    .text(boxX + boxW + 70, boxY + boxH2 + L2, 'Q')
    .text(boxX + boxW + 70, box2Y + boxH2 + L2, 'Q')
    .hLine(boxX + boxW + 70 + 1, box2Y + boxH2 - L2 - 3, 10)

    .printActions()
    .buildImage();
