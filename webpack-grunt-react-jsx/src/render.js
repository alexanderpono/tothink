const ROW1 = 0;
const ROW2 = 1;
const SIZES = {
    width: 14,
    boxHeight: 20,
    triangleHeight: 3
};

const COLORS = [];
COLORS[1] = '#f00';
COLORS[2] = '#00f';

export function validateRaport(raport) {
    if (raport.length !== 2) {
        throw "ER_RAPORT_LINES_NO: raport.length !== 2";
    };
    const isArray1 = Array.isArray(raport[ROW1]);
    const isArray2 = Array.isArray(raport[ROW2]);
    if (!isArray1) {
        throw "ER_RAPORT_LINE1_NO_ARRAY";
    };
    if (!isArray2) {
        throw "ER_RAPORT_LINE2_NO_ARRAY";
    };

    const len1 = raport[ROW1].length;
    const len2 = raport[ROW2].length;
    // if (Math.abs(len1 - len2) !== 1) {
    //     throw "ER_RAPORT_LINES_LENGTH";

    // }

}

export function renderSquareView(raport, targetId) {
    const target = document.getElementById(targetId);

    const len1 = raport[ROW1].length;
    const len2 = raport[ROW2].length;
    const tableWidth = len1 + len2;

    const table = document.createElement('table');
    let tableRow1 = [];
    let tableRow2 = [];
    for (let i=0; i<tableWidth; i++) {
        tableRow1.push(0);
        tableRow2.push(0);
    }
    if (len2 > len1) {
        raport[ROW1].forEach((item,index) => {
            const targetIndex = 1 + index*2;
            tableRow1[targetIndex] = item;
        });
        raport[ROW2].forEach((item,index) => {
            const targetIndex = index*2;
            tableRow2[targetIndex] = item;
        });
    }
    else {
        raport[ROW2].forEach((item,index) => {
            const targetIndex = 1 + index*2;
            tableRow2[targetIndex] = item;
        });
        raport[ROW1].forEach((item,index) => {
            const targetIndex = index*2;
            tableRow1[targetIndex] = item;
        });
    }
    

    const classHtmls = ['', ` class="color1"`, ` class="color2"`];

    let row1HtmlAr = tableRow1.map((colorCode, index) => {
        const classHtml = classHtmls[colorCode];
        return `<td${classHtml}>&nbsp;</td>`;
    })

    let row2HtmlAr = tableRow2.map((colorCode, index) => {
        const classHtml = classHtmls[colorCode];
        return `<td${classHtml}>&nbsp;</td>`;
    })

    const html = 
        `<table cellspacing="0" cellpadding="0" border="0"><tr>${row2HtmlAr.join("")}</tr>` + 
        `<tr>${row1HtmlAr.join("")}</tr></table>` 
    ;

    target.innerHTML = html;
}

function addVector(v1, v2) {
    return {x: v1.x + v2.x, y: v1.y + v2.y};
}
function vector(x, y) {
    return {x: x, y:y};
}

function renderCell(ctx, start, fillStyle) {
    const a2 = SIZES.width/2;
    const topTriangleR = addVector(start, vector(a2, SIZES.triangleHeight));
    const topTriangleL = addVector(start, vector(-a2, SIZES.triangleHeight));
    const bottomTriangleR = addVector(topTriangleR, vector(0, SIZES.boxHeight));
    const bottomTriangleL = addVector(topTriangleL, vector(0, SIZES.boxHeight));
    const end = addVector(bottomTriangleR, vector(-a2, SIZES.triangleHeight));

    ctx.beginPath();
    ctx.moveTo(start.x,start.y);
    ctx.lineTo(topTriangleR.x,topTriangleR.y);
    ctx.lineTo(bottomTriangleR.x,bottomTriangleR.y);
    ctx.lineTo(end.x,end.y);
    ctx.lineTo(bottomTriangleL.x,bottomTriangleL.y);
    ctx.lineTo(topTriangleL.x,topTriangleL.y);
    ctx.lineTo(start.x,start.y);
    ctx.closePath();


    ctx.strokeStyle = '#000';
    ctx.fillStyle = fillStyle;
    ctx.fill();
    ctx.stroke();

}

export function renderMeshView(raport, targetId) {
    // console.log('renderMeshView() raport=', raport);
    const canvas = document.getElementById(targetId);
    // console.log('renderMeshView() canvas=', canvas);

    const ctx = canvas.getContext('2d');

    let start = {x: 10, y: 5};
    if (raport[ROW2].length < raport[ROW1].length) {
        start = addVector(start, vector(SIZES.width, 0));
    }

    const render = (start, line) => {
        let start0 = Object.assign({}, start);
        for (let i=0; i<line.length; i++) {
            let knitCode = line[i];
            let color = COLORS[knitCode];
            if (typeof color === 'undefined') {
                color = '#000';
            };
            renderCell(ctx, start0, color);
            start0 = addVector(start0, vector(SIZES.width, 0));
        };
    
    };

    render(start, raport[ROW2]);

    let start0 = addVector(start, vector(SIZES.width / 2, SIZES.triangleHeight + SIZES.boxHeight));
    if (raport[ROW2].length < raport[ROW1].length) {
        start0 = addVector(start0, vector(-SIZES.width, 0));
    }
    render(start0, raport[ROW1]);
}