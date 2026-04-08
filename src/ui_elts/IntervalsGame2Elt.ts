import { Gfx } from "../Gfx";
import { Rect } from "../Rect";
import { Scale, ScaleQuality } from "../Scale";
import { BaseElt } from "./BaseElt";
import { TextElt } from "./TextElt";
import { getRandomInt, modAddition } from "../util";

interface IntervalDef {
    label: string;
    semitones: number;
    scaleQuality: ScaleQuality;
}

const intervalDefs: Record<string, IntervalDef> = {
    min3rd: { label: "Min 3rd", semitones: 3, scaleQuality: "minor" },
    maj3rd: { label: "Maj 3rd", semitones: 4, scaleQuality: "major" },
    fourth: { label: "4th",     semitones: 5, scaleQuality: "major" },
    b5th:   { label: "b5th",    semitones: 6, scaleQuality: "major" },
    fifth:  { label: "5th",     semitones: 7, scaleQuality: "major" },
    min6th: { label: "Min 6th", semitones: 8, scaleQuality: "minor" },
    maj6th: { label: "Maj 6th", semitones: 9, scaleQuality: "major" },
};

class IntervalsGame2Elt extends BaseElt {
    displayTextSize: number = 62;
    buttonTextSize: number = 82;

    displayElt1: TextElt;
    nextButton: TextElt;

    useMin3rd: boolean = false;
    useMaj3rd: boolean = false;
    use4th: boolean = false;
    useB5th: boolean = false;
    use5th: boolean = false;
    useMin6th: boolean = false;
    useMaj6th: boolean = false;

    min3rdButton: TextElt;
    maj3rdButton: TextElt;
    fourthButton: TextElt;
    b5thButton: TextElt;
    fifthButton: TextElt;
    min6thButton: TextElt;
    maj6thButton: TextElt;

    flipped: boolean = false;
    curRootNum: number = 0;
    curInterval: IntervalDef = intervalDefs.maj3rd;
    curAnswer: string = "";

    constructor(gfx: Gfx, rect: Rect) {
        super(gfx, rect);

        let nextY = this.rect.y;
        this.displayElt1 = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: nextY,
                w: 1100,
                h: 100
            },
            "enable intervals and press next",
            this.displayTextSize
        );
        this.pushChild(this.displayElt1);

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
        this.min3rdButton = this.makeToggleButton(
            nextY,
            "Min 3rd",
            () => this.useMin3rd,
            (val) => { this.useMin3rd = val; }
        );
        this.pushChild(this.min3rdButton);

        nextY += 100;
        this.maj3rdButton = this.makeToggleButton(
            nextY,
            "Maj 3rd",
            () => this.useMaj3rd,
            (val) => { this.useMaj3rd = val; }
        );
        this.pushChild(this.maj3rdButton);

        nextY += 100;
        this.fourthButton = this.makeToggleButton(
            nextY,
            "4th",
            () => this.use4th,
            (val) => { this.use4th = val; }
        );
        this.pushChild(this.fourthButton);

        nextY += 100;
        this.b5thButton = this.makeToggleButton(
            nextY,
            "b5th",
            () => this.useB5th,
            (val) => { this.useB5th = val; }
        );
        this.pushChild(this.b5thButton);

        nextY += 100;
        this.fifthButton = this.makeToggleButton(
            nextY,
            "5th",
            () => this.use5th,
            (val) => { this.use5th = val; }
        );
        this.pushChild(this.fifthButton);

        nextY += 100;
        this.min6thButton = this.makeToggleButton(
            nextY,
            "Min 6th",
            () => this.useMin6th,
            (val) => { this.useMin6th = val; }
        );
        this.pushChild(this.min6thButton);

        nextY += 100;
        this.maj6thButton = this.makeToggleButton(
            nextY,
            "Maj 6th",
            () => this.useMaj6th,
            (val) => { this.useMaj6th = val; }
        );
        this.pushChild(this.maj6thButton);
    }

    makeToggleButton(y: number, label: string, getter: () => boolean, setter: (val: boolean) => void): TextElt {
        const button = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: y,
                w: 1100,
                h: 100
            },
            `${label}: ${getter()}`,
            this.buttonTextSize
        );
        button.drawRect = true;
        button.onClick = () => {
            setter(!getter());
            button.setText(`${label}: ${getter()}`);
        };
        return button;
    }

    update(): void {
        const enabled = this.getEnabledIntervals();
        if (enabled.length === 0) {
            this.displayElt1.setText("enable intervals and press next");
            return;
        }

        if (this.flipped) {
            // show next question
            this.curRootNum = getRandomInt(12);
            this.curInterval = enabled[getRandomInt(enabled.length)];

            const scale = new Scale(this.curRootNum, this.curInterval.scaleQuality);
            const rootName = scale.root.noteName;
            const answerNoteNum = modAddition(this.curRootNum, this.curInterval.semitones, 12);
            this.curAnswer = scale.allNotes[answerNoteNum].noteName;

            this.displayElt1.setText(`${this.curInterval.label} of ${rootName}`);
        } else {
            // show answer
            this.displayElt1.setText(this.curAnswer);
        }
        this.flipped = !this.flipped;
    }

    getEnabledIntervals(): IntervalDef[] {
        const enabled: IntervalDef[] = [];
        if (this.useMin3rd) enabled.push(intervalDefs.min3rd);
        if (this.useMaj3rd) enabled.push(intervalDefs.maj3rd);
        if (this.use4th)    enabled.push(intervalDefs.fourth);
        if (this.useB5th)   enabled.push(intervalDefs.b5th);
        if (this.use5th)    enabled.push(intervalDefs.fifth);
        if (this.useMin6th) enabled.push(intervalDefs.min6th);
        if (this.useMaj6th) enabled.push(intervalDefs.maj6th);
        return enabled;
    }

    onKeyDown(key: string): void {
        if (key === "space") {
            this.update();
        }
    }
}

export { IntervalsGame2Elt };
