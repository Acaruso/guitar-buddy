import { Gfx } from "../Gfx";
import { Rect } from "../Rect";
import { BaseElt } from "./BaseElt";
import { TextElt } from "./TextElt";
import { getRandomInt } from "../util";

class Interval {
    strang:     string = "";
    interval:   string = "";
    direction:  string = "";
    numStrangs: string = "";
};

class IntervalsGameElt extends BaseElt {
    textSize: number = 82;
    textPadding: number = 16;
    line1: TextElt;
    line2: TextElt;
    line3: TextElt;
    line4: TextElt;
    tickRef: any = null;
    tickTime: number = 3000;    // milliseconds
    timerOn: boolean = false;

    notes: Array<string> = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
    ];

    octavesUp: Array<Interval> = [
        // { strang: "low E", interval: "octave", direction: "up", numStrangs: "one" },
        { strang: "low E", interval: "octave", direction: "up", numStrangs: "two" },
        { strang: "low E", interval: "octave", direction: "up", numStrangs: "three" },
        // { strang: "A",     interval: "octave", direction: "up", numStrangs: "one" },
        { strang: "A",     interval: "octave", direction: "up", numStrangs: "two" },
        { strang: "A",     interval: "octave", direction: "up", numStrangs: "three" },
        // { strang: "D",     interval: "octave", direction: "up", numStrangs: "one" },
        { strang: "D",     interval: "octave", direction: "up", numStrangs: "two" },
        { strang: "D",     interval: "octave", direction: "up", numStrangs: "three" },
        // { strang: "G",     interval: "octave", direction: "up", numStrangs: "one" },
        { strang: "G",     interval: "octave", direction: "up", numStrangs: "two" },
        // { strang: "B",     interval: "octave", direction: "up", numStrangs: "one" },
    ];

    octavesDown: Array<Interval> = [
        // { strang: "A",      interval: "octave", direction: "down", numStrangs: "one" },
        // { strang: "D",      interval: "octave", direction: "down", numStrangs: "one" },
        { strang: "D",      interval: "octave", direction: "down", numStrangs: "two" },
        // { strang: "G",      interval: "octave", direction: "down", numStrangs: "one" },
        { strang: "G",      interval: "octave", direction: "down", numStrangs: "two" },
        { strang: "G",      interval: "octave", direction: "down", numStrangs: "three" },
        // { strang: "B",      interval: "octave", direction: "down", numStrangs: "one" },
        { strang: "B",      interval: "octave", direction: "down", numStrangs: "two" },
        { strang: "B",      interval: "octave", direction: "down", numStrangs: "three" },
        // { strang: "high E", interval: "octave", direction: "down", numStrangs: "one" },
        { strang: "high E", interval: "octave", direction: "down", numStrangs: "two" },
        { strang: "high E", interval: "octave", direction: "down", numStrangs: "three" },
    ];

    octaves: Array<Interval> = [ ...this.octavesUp, ...this.octavesDown ];

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
            clearInterval(this.tickRef);
            this.tickRef = setInterval(() => this.tick(), this.tickTime);
            this.update();
            this.timerOn = true;
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
        const r1 = getRandomInt(this.octaves.length);
        const r2 = getRandomInt(this.notes.length);
        const interval = this.octaves[r1];
        const note = this.notes[r2];
        const strs = this.makeStrings(interval, note);
        this.line1.setText(strs.line1);
        this.line2.setText(strs.line2);
        this.line3.setText(strs.line3);
        this.line4.setText(strs.line4);
    }

    makeStrings(obj: Interval, note: string) {
        const s = obj.numStrangs === "one" ? "" : "s";
        return {
            line1: `string:    ${obj.strang}`,
            line2: `note:      ${note}`,
            line3: `interval:  ${obj.interval}`,
            line4: `direction: ${obj.numStrangs} string${s} ${obj.direction}`,
        };
    }
}

export { IntervalsGameElt };
