import { Gfx } from "../Gfx";
import { Rect } from "../Rect";
import { Scale, ScaleQuality, doScalesIntersect } from "../Scale";
import { BaseElt } from "./BaseElt";
import { TextElt } from "./TextElt";
import { getRandomInt } from "../util";

class ScalesGameElt extends BaseElt {
    root: number = 0;
    offset: number = 0;
    sign: number = 0;
    curNote: number = 0;
    numNotes: number = 0;
    upDown: Array<string> = ["up", "down"];
    upDownIdx: number = 0;
    modes: Array<string> = ["degrees", "thirds"];
    modeIdx: number = 0;
    stepSize: number = 1;

    scale: Scale = new Scale(0, "major");

    scaleQualities: Array<string> = ["major", "minor"];
    scaleQualitiesIdx: number = 0;

    displayElt1: TextElt;
    displayElt2: TextElt;
    nextButton: TextElt;
    useThirdsButton: TextElt;
    useMinorScalesButton: TextElt;

    flipped: boolean = false;
    useThirds: boolean = true;
    useMinorScales: boolean = true;
    displayTextSize: number = 62;
    buttonTextSize: number = 82;

    constructor(gfx: Gfx, rect: Rect) {
        super(gfx, rect);

        this.getRandVals(true);

        let nextY = this.rect.y;
        this.displayElt1 = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: nextY,
                w: 1100,
                h: 100
            },
            this.getDisplay1TextFront(),
            this.displayTextSize
        );
        this.pushChild(this.displayElt1);

        nextY += 80;
        this.displayElt2 = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: nextY,
                w: 1100,
                h: 100
            },
            this.getDisplay2TextFront(),
            this.displayTextSize
        );
        this.pushChild(this.displayElt2);

        nextY += 100;
        this.nextButton = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: nextY,
                w: 1100,
                h: 100
            },
            "next",
            this.buttonTextSize
        );
        this.nextButton.drawRect = true;
        this.nextButton.onClick = () => {
            this.update();
        };
        this.pushChild(this.nextButton);

        nextY += 100;
        this.useThirdsButton = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: nextY,
                w: 1100,
                h: 100
            },
            `use thirds: ${this.useThirds}`,
            this.buttonTextSize
        );
        this.useThirdsButton.drawRect = true;
        this.useThirdsButton.onClick = () => {
            if (this.useThirds) {
                this.modes = ["degrees"];
            } else {
                this.modes = ["degrees", "thirds"];
            }
            this.useThirds = !this.useThirds;
            this.useThirdsButton.setText(`use thirds: ${this.useThirds}`);
        };
        this.pushChild(this.useThirdsButton);

        nextY += 100;
        this.useMinorScalesButton = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: nextY,
                w: 1100,
                h: 100
            },
            `use minor scales: ${this.useMinorScales}`,
            this.buttonTextSize
        );
        this.useMinorScalesButton.drawRect = true;
        this.useMinorScalesButton.onClick = () => {
            if (this.useMinorScales) {
                this.scaleQualities = ["major"];
            } else {
                this.scaleQualities = ["major", "minor"];
            }
            this.useMinorScales = !this.useMinorScales;
            this.useMinorScalesButton.setText(`use minor scales: ${this.useMinorScales}`);
        };
        this.pushChild(this.useMinorScalesButton);
    }

    update(): void {
        if (this.flipped == false) {
            this.displayElt2.setText(this.getDisplay2TextBack());
        } else {
            this.getRandVals();
            this.displayElt1.setText(this.getDisplay1TextFront());
            this.displayElt2.setText(this.getDisplay2TextFront());
        }
        this.flipped = !this.flipped;
    }

    getRandVals(init: boolean = false): void {
        this.upDownIdx = getRandomInt(this.upDown.length);
        this.scaleQualitiesIdx = getRandomInt(this.scaleQualities.length);

        if (init) {
            const newRoot = getRandomInt(12);
            this.scale = new Scale(
                newRoot,
                this.scaleQualities[this.scaleQualitiesIdx] as ScaleQuality
            );
            this.scale.setCurNote(newRoot);
        } else {
            this.getNextScale();
        }

        this.sign = this.upDown[this.upDownIdx] == "up"
            ? 1
            : -1

        this.modeIdx = getRandomInt(this.modes.length);
        this.stepSize = this.modes[this.modeIdx] === "degrees"
            ? 1
            : 2;
        if (this.modes[this.modeIdx] === "degrees") {
            this.numNotes = getRandomInt(3) + 3;
        } else if (this.modes[this.modeIdx] === "thirds") {
            this.numNotes = getRandomInt(2) + 3;
        }
    }

    getNextScale(): void {
        let rootCandidate: number = 0;
        let scaleCandidate: Scale;

        while (true) {
            // don't pick the same root twice in a row
            rootCandidate = getRandomInt(12);
            while (rootCandidate == this.scale.root.noteNum) {
                rootCandidate = getRandomInt(12);
            }

            scaleCandidate = new Scale(
                rootCandidate,
                this.scaleQualities[this.scaleQualitiesIdx] as ScaleQuality
            );

            const rc: boolean = doScalesIntersect(this.scale, scaleCandidate, this.scale.getCurNote().noteNum);
            if (rc === true) {
                scaleCandidate.setCurNote(this.scale.getCurNote().noteNum);
                this.scale = scaleCandidate;
                return;
            }
        }
    }

    getDisplay1TextFront(): string {
        return `${this.scale.root.noteName} ${this.scale.scaleQuality}`;
    }

    getDisplay2TextFront(): string {
        return `note: ${this.scale.getCurNote().noteName}`
            + `, ${this.upDown[this.upDownIdx]} ${this.numNotes} ${this.modes[this.modeIdx]}`;
    }

    getDisplay2TextBack(): string {
        let arr: Array<string> = [];

        for (let i = 0; i < this.numNotes - 1; i++) {
            arr.push(this.scale.getCurNote().noteName);
            this.scale.incCurNote(this.stepSize * this.sign);
        }
        arr.push(this.scale.getCurNote().noteName);

        return arr.join(" ");
    }

    onKeyDown(key: string): void {
        if (key === "space") {
            this.update();
        }
    }
}

export { ScalesGameElt };
