import { textConstants } from "./textConstants";
import { Rect } from "./Rect";
import { Coord } from "./Coord";
import { constants } from "./constants";

class Gfx {
    canvas: any;
    ctx: any;
    queue: Array<any>;

    constructor() {
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.queue = [];
    }

    push(command: any, z: number) {
        this.queue.push({ command, z });
    }

    drawRect(rect: Rect, z: number = 0) {
        const command = (ctx: any) => {
            const color = rect.color ? rect.color : constants.black;

            // 0.0 == transparent, 1.0 == solid
            const alpha = rect.alpha ? rect.alpha : 1.0;

            this.ctx.globalAlpha = alpha;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.rect(rect.x, rect.y, rect.w, rect.h);
            ctx.fill();
            ctx.closePath();
            this.ctx.globalAlpha = 1.0;
        };

        this.push(command, z);
    }

    strokeRect(rect: Rect, z: number = 0) {
        const color = rect.color ? rect.color : constants.black;

        const upperLeft = { x: rect.x, y: rect.y };
        const upperRight = { x: rect.x + rect.w, y: rect.y };
        const lowerRight = { x: rect.x + rect.w, y: rect.y + rect.h };
        const lowerLeft = { x: rect.x, y: rect.y + rect.h };

        this.drawLine(upperLeft, upperRight, z, color);
        this.drawLine(upperRight, lowerRight, z, color);
        this.drawLine(lowerRight, lowerLeft, z, color);
        this.drawLine(lowerLeft, upperLeft, z, color);
    }

    strokeRectHeavy(rect: Rect, z: number = 0) {
        const color = rect.color ? rect.color : constants.black;

        this.drawLineHeavy(
            { x: rect.x, y: rect.y },
            { x: rect.x + rect.w + 1, y: rect.y },
            z,
            color
        );

        this.drawLineHeavy(
            { x: rect.x + rect.w, y: rect.y },
            { x: rect.x + rect.w, y: rect.y + rect.h + 1},
            z,
            color
        );

        this.drawLineHeavy(
            { x: rect.x + rect.w, y: rect.y + rect.h },
            { x: rect.x - 1, y: rect.y + rect.h },
            z,
            color
        );

        this.drawLineHeavy(
            { x: rect.x, y: rect.y + rect.h },
            { x: rect.x, y: rect.y - 1},
            z,
            color
        );
    }

    drawLine(
        beginCoord: Coord,
        endCoord: Coord,
        z: number = 0,
        color: string = constants.black
    ) {
        const command = (ctx: any) => {
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(beginCoord.x, beginCoord.y);
            ctx.lineTo(endCoord.x, endCoord.y);
            ctx.stroke();
        };

        this.push(command, z);
    }

    drawLineHeavy(
        beginCoord: Coord,
        endCoord: Coord,
        z: number = 0,
        color: string = constants.black
    ) {
        const command = (ctx: any) => {
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(beginCoord.x, beginCoord.y);
            ctx.lineTo(endCoord.x, endCoord.y);
            ctx.stroke();
        };

        this.push(command, z);
    }

    drawFilledCircle(
        coord: Coord,
        radius: number,
        z: number = 0,
        color: string = constants.black
    ) {
        const command = (ctx: any) => {
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(
                coord.x,
                coord.y,
                radius,
                0,
                2 * Math.PI
            );
            ctx.fill();
        };

        this.push(command, z);
    }

    drawOutlinedCircle(
        coord: Coord,
        radius: number,
        z: number = 0,
        color: string = constants.black
    ) {
        const command = (ctx: any) => {
            ctx.strokeStyle = color;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(
                coord.x,
                coord.y,
                radius,
                0,
                2 * Math.PI
            );
            ctx.stroke();
        };

        this.push(command, z);
    }

    drawText(
        text: string,
        size: number,
        coord: Coord,
        color: string = constants.black,
        z: number = 0
    ) {
        const command = (ctx: any) => {
            ctx.font = `${size}px ${textConstants.textStyle}`;
            ctx.fillStyle = color;

            // coord for fillText(text, coord) is *bottom* left side of text
            // however, our coord is for *top* left side of text
            // thus, we need to do coord.y + textConstants.charHeight
            ctx.fillText(text, coord.x, coord.y + textConstants.charHeight);
        };

        this.push(command, z);
    }

    draw() {
        this.sortQueue(this.queue);

        while (this.queue.length > 0) {
            const elt = this.queue[this.queue.length - 1];
            elt.command(this.ctx);
            this.queue.pop();
        }
    }

    private sortQueue(queue: any) {
        queue.sort((first: any, second: any) => {
            return second.z - first.z;
        });
    }

    clearScreen() {
        this.drawRect(
            {
                x: 0,
                y: 0,
                w: this.canvas.width,
                h: this.canvas.height,
                color: constants.white
            },
            -100
        );
    }
}

export { Gfx };
