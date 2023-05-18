import { Gfx } from "../Gfx";
import { Rect } from "../Rect";
import { BaseElt } from "./BaseElt";
import { TextElt } from "./TextElt";
import { getRandomInt } from "../util";

class StringFretGameElt extends BaseElt {
    textSize: number = 82;
    textPadding: number = 16;
    strang: string = "";
    note: string = "";
    stringElt: TextElt;
    fretElt: TextElt;
    tickRef: any = null;
    tickTime: number = 3500;    // milliseconds
    timerOn: boolean = false;
    prevR1: number = 0;
    prevR2: number = 0;

    numFrets: number = 12;

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

        this.stringElt = new TextElt(
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

        this.fretElt = new TextElt(
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

        this.pushChild(this.stringElt);
        this.pushChild(this.fretElt);

        this.update();
    }

    onKeyDown(key: string) {
        if (key === "space") {
            // this.timerOn = true;
            // clearInterval(this.tickRef);
            // this.tickRef = setInterval(() => this.tick(), this.tickTime);
            this.update();
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
        let r1 = getRandomInt(this.strangs.length);
        let r2 = getRandomInt(this.numFrets + 1);

        // don't repeat same r1 and r2 twice in a row:
        while (r1 === this.prevR1 && r2 === this.prevR2) {
            r1 = getRandomInt(this.strangs.length);
            r2 = getRandomInt(this.numFrets + 1);
        }

        this.prevR1 = r1;
        this.prevR2 = r2;

        this.stringElt.setText(`string: ${this.strangs[r1]}`);
        this.fretElt.setText(`fret:   ${r2}`);
    }
}

export { StringFretGameElt };
