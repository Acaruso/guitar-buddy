import { Gfx } from "../Gfx";
import { Rect } from "../Rect";
import { BaseElt } from "./BaseElt";
import { TextElt } from "./TextElt";
import { getRandomInt } from "../util";

class TriadInversionsGameElt extends BaseElt {
    stringElt: TextElt;
    fretElt: TextElt;
    typeElt: TextElt;
    inversionElt: TextElt;

    textSize: number = 82;
    textPadding: number = 16;
    strang: string = "";
    note: string = "";
    tickRef: any = null;
    tickTime: number = 2500;    // milliseconds
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
        1,
        1,
        1,
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

        this.typeElt = new TextElt(
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

        this.inversionElt = new TextElt(
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

        this.pushChild(this.stringElt);
        this.pushChild(this.fretElt);
        this.pushChild(this.typeElt);
        this.pushChild(this.inversionElt);

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
        let strangIdx = this.getStrangIdx();
        let fret      = this.getFret();

        // don't repeat the same random numbers twice in a row:
        while (strangIdx === this.prevR1 && fret === this.prevR2) {
            strangIdx = this.getStrangIdx();
            fret      = this.getFret();
        }

        this.prevR1 = strangIdx;
        this.prevR2 = fret;

        const type = this.getType();
        const inversion = this.getInversion(strangIdx);

        const distToMoveUp = getDistToMoveUp(strangIdx, type, inversion);
        fret += distToMoveUp;

        this.stringElt.setText(   `string:    ${this.strangs[strangIdx]}`);
        this.fretElt.setText(     `fret:      ${fret}`);
        this.typeElt.setText(     `type:      ${type}`);
        this.inversionElt.setText(`inversion: ${inversion}`)
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

    getType() {
        const arr = ["major", "minor"];
        return arr[getRandomInt(arr.length)];
    }

    getInversion(strangIdx: number) {
        const arr = []

        if (isBetween(strangIdx, 0, 3)) {
            arr.push("root position");
        }

        if (isBetween(strangIdx, 1, 4)) {
            arr.push("2nd inversion");
        }

        if (isBetween(strangIdx, 2, 4)) {
            arr.push("1st inversion shell");
        }

        if (isBetween(strangIdx, 2, 5)) {
            arr.push("1st inversion");
        }

        return arr[getRandomInt(arr.length)];
    }
}

// is x between a inclusive and b inclusive
function isBetween(x: number, a: number, b: number) {
    return (x >= a && x <= b);
}

type DistMapType = {
    [key: string]: {
        [key: string]: {
            [key: number]: number
        }
    }
};

const distMap: DistMapType = {
    "major": {
        "root position": {
            0: 3,
            1: 3,
            2: 2,
            3: 3,
        },
        "1st inversion": {
            2: 0,
            3: 0,
            4: 1,
            5: 0,
        },
        "2nd inversion": {
            1: 1,
            2: 1,
            3: 0,
            4: 1,
        },
        "1st inversion shell": {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
        }
    },
    "minor": {
        "root position": {
            0: 3,
            1: 3,
            2: 2,
            3: 2,
        },
        "1st inversion": {
            2: 0,
            3: 0,
            4: 1,
            5: 0,
        },
        "2nd inversion": {
            1: 2,
            2: 2,
            3: 1,
            4: 2,
        },
        "1st inversion shell": {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
        }
    }
};

function getDistToMoveUp(strangIdx: number, type: string, inversion: string): number {
    let res = 0;
    try {
        res = distMap[type][inversion][strangIdx];
    } catch (e) {
        // do nothing
    }
    return res;
}

// function getDistToMoveUp(strangIdx: number, type: string, inversion: string): number {
//     // note that `strangIdx` is the string index of the *root note* of the chord.
//     // want to return distance that we would need to move root note up if root note was
//     // originally at 0, for it to be playable.
//     if (type === "major") {
//         if (inversion === "root position") {
//             if (strangIdx === 0 || strangIdx === 1) {
//                 return 3;
//             } else if (strangIdx === 2 || strangIdx === 3) {
//                 return 2;
//             }
//         } else if (inversion === "1st inversion") {
//             if (strangIdx === 2 || strangIdx === 3) {
//                 return 0;
//             } else if (strangIdx === 4) {
//                 return 1;
//             } else if (strangIdx === 5) {
//                 return 0;
//             }
//         } else if (inversion === "2nd inversion") {
//             if (strangIdx === 1 || strangIdx === 2) {
//                 return 1;
//             } else if (strangIdx === 3) {
//                 return 0;
//             } else if (strangIdx === 4) {
//                 return 1;
//             }
//         }
//     } else if (type === "minor") {
//         if (inversion === "root position") {
//             if (strangIdx === 0 || strangIdx === 1) {
//                 return 3;
//             } else if (strangIdx === 2 || strangIdx === 3) {
//                 return 2;
//             }
//         } else if (inversion === "1st inversion") {
//             if (strangIdx === 2 || strangIdx === 3) {
//                 return 0;
//             } else if (strangIdx === 4) {
//                 return 1;
//             } else if (strangIdx === 5) {
//                 return 0;
//             }
//         } else if (inversion === "2nd inversion") {
//             if (strangIdx === 1 || strangIdx === 2) {
//                 return 2;
//             } else if (strangIdx === 3) {
//                 return 1;
//             } else if (strangIdx === 4) {
//                 return 2;
//             }
//         }
//     }

//     return 0;
// }

export { TriadInversionsGameElt };
