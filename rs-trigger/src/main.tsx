import React from 'react';
import { render } from 'react-dom';

console.log('main!');

class ViewPort {
    private context: CanvasRenderingContext2D = null;
    private canvas: HTMLCanvasElement = null;

    constructor(private domTarget: string) {}

    setSize = (w: number, h: number) => {
        render(
            <canvas id="canvas" height={h} width={w}></canvas>,
            document.getElementById(this.domTarget)
        );
        return this;
    };

    createContext = () => {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        if (this.canvas === null) {
            console.log('canvas === null');
            return null;
        }
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        return this;
    };

    lineColor = (color: string) => {
        this.context.strokeStyle = color;
        return this;
    };

    fillColor = (color: string) => {
        this.context.fillStyle = color;
        return this;
    };

    lineWidth = (width: number) => {
        this.context.lineWidth = width;
        return this;
    };

    border = () => {
        return this.box(0, 0, this.canvas.width, this.canvas.height);
    };

    line = (x0: number, y0: number, x1: number, y1: number) => {
        this.context.beginPath();
        this.context.moveTo(x0, y0);
        this.context.lineTo(x1, y1);
        this.context.stroke();
        this.context.closePath();
        return this;
    };

    hLine = (x0: number, y0: number, len: number) => {
        return this.line(x0, y0, x0 + len, y0);
    };

    vLine = (x0: number, y0: number, len: number) => {
        return this.line(x0, y0, x0, y0 + len);
    };

    box = (x0: number, y0: number, w: number, h: number) => {
        this.context.strokeRect(x0, y0, w, h);
        return this;
    };

    drawCircle = (xPos: number, yPos: number, radius: number) => {
        const startAngle = 0 * (Math.PI / 180);
        const endAngle = 360 * (Math.PI / 180);
        this.context.beginPath();
        this.context.arc(xPos, yPos, radius, startAngle, endAngle, false);
        this.context.fill();
        this.context.stroke();
        return this;
    };

    font = (font: string) => {
        this.context.font = font;
        return this;
    };

    text = (x: number, y: number, text: string) => {
        this.context.fillText(text, x, y);
        return this;
    };

    static create = (domTarget: string): ViewPort => {
        return new ViewPort(domTarget);
    };
}

const boxW = 60;
const boxH = 100;
const boxH2 = boxH / 2;
const boxX = 100;
const boxY = 80;
const box2Y = 250;
const L2 = 5;
ViewPort.create('UI')
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
;
