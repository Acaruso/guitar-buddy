import { Gfx } from "./Gfx";
import { State } from "./State";
import { BaseElt } from "./ui_elts/BaseElt";
import { FretboardElt } from "./ui_elts/FretboardElt";
import { NoteStringGameElt } from "./ui_elts/NoteStringGameElt";
import { IntervalsGameElt } from "./ui_elts/IntervalsGameElt";
import { StringFretGameElt } from "./ui_elts/StringFretGameElt";
import { FlashcardsGameElt } from "./ui_elts/FlashcardsGameElt";
import { NotesSemitoneGameElt } from "./ui_elts/NotesSemitoneGameElt";
import { StringFretSemitoneGameElt } from "./ui_elts/StringFretSemitoneGame";
import { TriadInversionsGameElt } from "./ui_elts/TriadInversionsGameElt";
import { SemitonesUpDownGameElt } from "./ui_elts/SemitonesUpDownGameElt";
import { constants } from "./constants";
import { isInsideRect, addHandler, addButtonOnClickHandler } from "./util";
import {
    majorKeySharpsFlatsFlashcards,
    basicTriadFlashcards,
    fullMajorTriadFlashcards,
    fullMajorMinorTriadFlashcards,
} from "./flashcards";

class Ui {
    gfx: Gfx;
    state: State;
    private rootElt: BaseElt;
    private mouseX: number = 0;
    private mouseY: number = 0;

    constructor(gfx: Gfx, state: State) {
        this.gfx = gfx;
        this.state = state;

        // create root ui elt

        this.rootElt = new BaseElt(
            this.gfx,
            { x: 0, y: 0, w: constants.canvasWidth, h: constants.canvasHeight }
        );

        // create event handlers

        addHandler("mousedown", (e: any) => this.onLeftMBDown(e));
        addHandler("mouseup",   (e: any) => this.onLeftMBUp(e));

        addHandler("mousemove", (e: any) => {
            this.mouseX = e.offsetX;
            this.mouseY = e.offsetY;
        });

        addHandler("keydown", (e: any) => {
            let key = e.key.toLowerCase();

            if (key === " ") {
                key = "space";
            }

            if (
                key === "arrowdown"
                || key === "arrowup"
                || key === "arrowleft"
                || key === "arrowright"
                || key === "space"
                || (this.state.keyboard["control"] && key !== "r")
            ) {
                e.preventDefault();
            }
            this.state.keyboard[key] = true;
            this.onKeyDown(key);
        });

        addHandler("keyup", (e: any) => {
            let key = e.key.toLowerCase();
            if (key === " ") {
                key = "space";
            }
            this.state.keyboard[key] = false;
        });

        // create button onClick handlers

        addButtonOnClickHandler("fretboard-button", () => {
            this.rootElt.clearChildren();
            this.rootElt.pushChild(
                new FretboardElt(
                    this.gfx,
                    { x: 20, y: 30, w: 20, h: 20 },
                    this.state,
                    6,              // num rows
                    30              // num cols
                )
            );
        });

        addButtonOnClickHandler("note-string-game-button", () => {
            this.rootElt.clearChildren();
            this.rootElt.pushChild(
                new NoteStringGameElt(
                    this.gfx,
                    { x: 20, y: 30, w: 20, h: 20 },
                )
            );
        });

        addButtonOnClickHandler("string-fret-game-button", () => {
            this.rootElt.clearChildren();
            this.rootElt.pushChild(
                new StringFretGameElt(
                    this.gfx,
                    { x: 20, y: 30, w: 20, h: 20 },
                )
            );
        });

        addButtonOnClickHandler("interval-game-button", () => {
            this.rootElt.clearChildren();
            this.rootElt.pushChild(
                new IntervalsGameElt(
                    this.gfx,
                    { x: 20, y: 30, w: 20, h: 20 },
                )
            );
        });

        addButtonOnClickHandler("notes-in-major-keys-button", () => {
            this.rootElt.clearChildren();
            this.rootElt.pushChild(
                new FlashcardsGameElt(
                    this.gfx,
                    { x: 20, y: 30, w: 20, h: 20 },
                    majorKeySharpsFlatsFlashcards,
                )
            );
        });

        addButtonOnClickHandler("basic-triads-button", () => {
            this.rootElt.clearChildren();
            this.rootElt.pushChild(
                new FlashcardsGameElt(
                    this.gfx,
                    { x: 20, y: 30, w: 20, h: 20 },
                    basicTriadFlashcards,
                )
            );
        });

        addButtonOnClickHandler("full-triads-button", () => {
            this.rootElt.clearChildren();
            this.rootElt.pushChild(
                new FlashcardsGameElt(
                    this.gfx,
                    { x: 20, y: 30, w: 20, h: 20 },
                    // fullMajorTriadFlashcards,
                    fullMajorMinorTriadFlashcards,
                )
            );
        });

        addButtonOnClickHandler("notes-semitones-game-button", () => {
            this.rootElt.clearChildren();
            this.rootElt.pushChild(
                new NotesSemitoneGameElt(
                    this.gfx,
                    { x: 20, y: 30, w: 2000, h: 1000 },
                )
            );
        });

        addButtonOnClickHandler("string-fret-semitone-game-button", () => {
            this.rootElt.clearChildren();
            this.rootElt.pushChild(
                new StringFretSemitoneGameElt(
                    this.gfx,
                    { x: 20, y: 30, w: 2000, h: 200 },
                )
            );
        });

        addButtonOnClickHandler("triad-inversion-game-button", () => {
            this.rootElt.clearChildren();
            this.rootElt.pushChild(
                new TriadInversionsGameElt(
                    this.gfx,
                    { x: 20, y: 30, w: 2000, h: 1000 },
                )
            );
        });

        addButtonOnClickHandler("semitones-up-down-game-button", () => {
            this.rootElt.clearChildren();
            this.rootElt.pushChild(
                new SemitonesUpDownGameElt(
                    this.gfx,
                    { x: 20, y: 30, w: 2000, h: 1000 },
                )
            );
        });

        // create FretboardElt as the default UI elt

        this.rootElt.pushChild(
            new FretboardElt(
                this.gfx,
                { x: 20, y: 30, w: 20, h: 20 },
                this.state,
                6,
                // 15,
                30
            )
        );
    }

    onLeftMBDown(event: any) {
        let q = [this.rootElt];
        let cur = null;
        let toLeftClick = [];

        while (q.length !== 0) {
            cur = q[0];
            q.shift();

            if (!isInsideRect(this.mouseX, this.mouseY, cur.rect)) {
                continue;
            }

            toLeftClick.push(cur);

            for (const child of cur.children) {
                q.push(child);
            }
        }

        for (const elt of toLeftClick) {
            elt.onLeftMBDown(this.mouseX, this.mouseY);
        }
    }

    onLeftMBUp(event: any) {}

    onKeyDown(key: string) {
        this.rootElt.onKeyDown(key);
    }

    tick() {
        this.gfx.clearScreen();

        // recursively draw all children, grandchildren, etc.
        this.rootElt.onDraw();

        this.gfx.draw();
    }
}

export { Ui };
