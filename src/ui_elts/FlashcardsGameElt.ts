import { Gfx } from "../Gfx";
import { Rect } from "../Rect";
import { BaseElt } from "./BaseElt";
import { TextElt } from "./TextElt";
import { getRandomInt } from "../util";

class Flashcard {
    text1: string;
    text2: string;
    flipped: boolean = false;

    constructor(text1: string, text2: string) {
        this.text1 = text1;
        this.text2 = text2;
    }

    getText() {
        return !this.flipped ? this.text1 : this.text2;
    }

    flip() {
        this.flipped = !this.flipped;
    }
}

class FlashcardsGameElt extends BaseElt {
    tickRef: any = null;
    tickTime: number = 2900;    // milliseconds
    timerOn: boolean = false;
    flashcards: Array<Flashcard> = [];
    flashcardTextElt: TextElt;
    textSize: number = 82;
    curFlashCardIdx: number = 0;

    constructor(gfx: Gfx, rect: Rect) {
        super(gfx, rect);

        this.flashcards = [
            // new Flashcard("C major", "n/a"),
            new Flashcard("G major", "F#"),
            new Flashcard("D major", "F# C#"),
            new Flashcard("A major", "F# C# G#"),
            new Flashcard("E major", "F# C# G# D#"),
            // new Flashcard("B major", "F# C# G# D# A#"),
            new Flashcard("F major", "Bb"),
            new Flashcard("Bb major", "Bb Eb"),
            new Flashcard("Eb major", "Bb Eb Ab"),
            // new Flashcard("Ab major", "Bb Eb Ab Db"),
            // new Flashcard("Db major", "Bb Eb Ab Db Gb"),
            // new Flashcard("Gb major", "Bb Eb Ab Db Gb Cb"),
        ];

        this.flashcardTextElt = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: this.rect.y,
                w: this.rect.w,
                h: this.rect.h
            },
            this.getCurFlashcard().getText(),
            this.textSize
        );

        this.pushChild(this.flashcardTextElt);
    }

    update() {
        let f = this.getCurFlashcard();

        if (!f.flipped) {
            f.flip();
        } else {
            f.flip();
            this.getNextFlashcard();
            f = this.getCurFlashcard();
        }

        this.flashcardTextElt.setText(f.getText());
    }

    getFlashcardIdx() {
        let i = getRandomInt(this.flashcards.length);

        while (i === this.curFlashCardIdx) {
            i = getRandomInt(this.flashcards.length);
        }

        return i;
    }

    getCurFlashcard() {
        return this.flashcards[this.curFlashCardIdx];
    }

    getNextFlashcard() {
        this.curFlashCardIdx = this.getFlashcardIdx();
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
}

export { FlashcardsGameElt };
