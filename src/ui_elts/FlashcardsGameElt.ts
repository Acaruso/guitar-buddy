import { Gfx } from "../Gfx";
import { Rect } from "../Rect";
import { BaseElt } from "./BaseElt";
import { TextElt } from "./TextElt";
import { Flashcard } from "../Flashcard";
import { getRandomInt } from "../util";

class FlashcardsGameElt extends BaseElt {
    tickRef: any = null;
    tickTime: number = 2900;    // milliseconds
    timerOn: boolean = false;
    flashcards: Array<Flashcard> = [];
    flashcardTextElt: TextElt;
    textSize: number = 82;
    curFlashCardIdx: number = 0;

    constructor(gfx: Gfx, rect: Rect, flashcards: Array<Flashcard>) {
        super(gfx, rect);

        this.flashcards = flashcards;

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
