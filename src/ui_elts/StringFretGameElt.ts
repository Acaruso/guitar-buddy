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
    tickTime: number = 2900;    // milliseconds
    timerOn: boolean = false;
    prevR1: number = 0;
    prevR2: number = 0;
    lowFret: number = 1;        // lowest fret inclusive
    highFret: number = 11;      // highest fret inclusive

    numFrets: number = (this.highFret + 1) - this.lowFret;

    strangs: Array<string> = [
        "low E",
        "A",
        "D",
        "G",
        "B",
        "high E",
    ];

    // higher number == more probability that this string will be chosen
    strangWeights: Array<number> = [
        1,
        1,
        6,
        6,
        3,
        1
    ];

    strangWeightRanges: Array<number> = [];

    strangWeightsTotal: number = 0;

    constructor(gfx: Gfx, rect: Rect) {
        super(gfx, rect);

        this.initStrangWeights();

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

    initStrangWeights() {
        for (const w of this.strangWeights) {
            this.strangWeightsTotal += w;
            this.strangWeightRanges.push(this.strangWeightsTotal);
        }
    }

    onKeyDown(key: string) {
        if (key === "space") {
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
        let r1 = this.getStrangIdx();
        let r2 = this.getFret();

        // don't repeat same r1 and r2 twice in a row:
        while (r1 === this.prevR1 && r2 === this.prevR2) {
            r1 = this.getStrangIdx();
            r2 = this.getFret();
        }

        this.prevR1 = r1;
        this.prevR2 = r2;

        this.stringElt.setText(`string: ${this.strangs[r1]}`);
        this.fretElt.setText(`fret:   ${r2}`);
    }

    getStrangIdx() {
        const r = getRandomInt(this.strangWeightsTotal);

        for (let i = 0; i < this.strangWeightRanges.length; i++) {
            if (r < this.strangWeightRanges[i]) {
                return i;
            }
        }

        return 0;
    }

    getFret() {
        return getRandomInt(this.numFrets) + this.lowFret;
    }
}

export { StringFretGameElt };
