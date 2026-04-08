import { Gfx } from "../Gfx";
import { Rect } from "../Rect";
import { BaseElt } from "./BaseElt";
import { TextElt } from "./TextElt";

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
            "interval game 2",
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
    }

    onKeyDown(key: string): void {
        if (key === "space") {
            this.update();
        }
    }
}

export { IntervalsGame2Elt };
