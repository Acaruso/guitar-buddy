import { Gfx } from "./Gfx";
import { State } from "./State";
import { BaseElt } from "./ui_elts/BaseElt";
import { FretboardElt } from "./ui_elts/FretboardElt";
import { constants } from "./constants";
import { isInsideRect, addHandler } from "./util";

class Ui {
    gfx: Gfx;
    state: State;
    private rootElt: BaseElt;
    private mouseX: number = 0;
    private mouseY: number = 0;

    constructor(gfx: Gfx, state: State) {
        this.gfx = gfx;
        this.state = state;

        addHandler("mousedown", (e: any) => this.onLeftMBDown(e));
        addHandler("mouseup",   (e: any) => this.onLeftMBUp(e));

        addHandler("mousemove", (e: any) => {
            this.mouseX = e.offsetX;
            this.mouseY = e.offsetY;
        });

        addHandler("keydown", (e: any) => {
            let key = e.key.toLowerCase();
            if (
                key === "arrowdown"
                || key === "arrowup"
                || key === "arrowleft"
                || key === "arrowright"
            ) {
                e.preventDefault();
            }
            if (key === " ") {
                key = "space";
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

        this.rootElt = new BaseElt(
            this.gfx,
            { x: 0, y: 0, w: constants.canvasWidth, h: constants.canvasHeight }
        );

        this.rootElt.pushChild(
            new FretboardElt(
                this.gfx,
                { x: 20, y: 30, w: 20, h: 20 },
                this.state,
                6,
                24
            )
        )
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
