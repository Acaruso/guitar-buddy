import { Gfx } from "../Gfx";
import { Rect } from "../Rect";
import { BaseElt } from "./BaseElt";
import { TextElt } from "./TextElt";
import { getRandomInt } from "../util";


class StringFretSemitoneGameElt extends BaseElt {
    textSize: number = 82;
    textPadding: number = 16;
    line1: TextElt;
    line2: TextElt;
    line3: TextElt;
    line4: TextElt;
    tickRef: any = null;
    tickTime: number = 5000;    // milliseconds
    timerOn: boolean = false;

    lowFret: number = 0;
    highFret: number = 12;

    strangs: Array<string> = [
        "low E",
        "A",
        "D",
        "G",
        "B",
        "high E",
    ];

    constructor(
        gfx: Gfx,
        rect: Rect
    ) {
        super(gfx, rect);

        this.line1 = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: this.rect.y,
                w: this.rect.w,
                h: this.rect.h
            },
            "",
            this.textSize
        );

        this.line2 = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: this.rect.y + this.textSize + this.textPadding,
                w: this.rect.w,
                h: this.rect.h
            },
            "",
            this.textSize
        );

        this.line3 = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: this.rect.y + ((this.textSize + this.textPadding) * 2),
                w: this.rect.w,
                h: this.rect.h
            },
            "",
            this.textSize
        );

        this.line4 = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: this.rect.y + ((this.textSize + this.textPadding) * 3),
                w: this.rect.w,
                h: this.rect.h
            },
            "",
            this.textSize
        );

        this.pushChild(this.line1);
        this.pushChild(this.line2);
        this.pushChild(this.line3);
        this.pushChild(this.line4);

        this.update();
    }

    onKeyDown(key: string) {
        if (key === "space") {
            // clearInterval(this.tickRef);
            // this.tickRef = setInterval(() => this.tick(), this.tickTime);
            this.update();
            // this.timerOn = true;
        }

        if (key === "t") {
            if (!this.timerOn) {
                this.tickRef = setInterval(() => this.tick(), this.tickTime);
            } else {
                clearInterval(this.tickRef);
            }
            this.timerOn = !this.timerOn;
        }
    }

    tick() {
        this.update();
    }

    update() {
        const strang = getRandomInt(6);
        const fret = getRandomInt(this.highFret);
        const semitone = getRandomInt(11) + 1;
        const directionInt = getRandomInt(2);
        const direction = directionInt === 0 ? "down" : "up";

        this.line1.setText(`string:    ${this.strangs[strang]}`);
        this.line2.setText(`fret:      ${fret}`);
        this.line3.setText(`semitone:  ${semitone}`);
        this.line4.setText(`string:    ${direction}`);
    }
}

export { StringFretSemitoneGameElt };
