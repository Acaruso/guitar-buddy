import { Gfx } from "./Gfx";
import { BaseElt } from "./ui_elts/BaseElt";
import { FretboardElt } from "./ui_elts/FretboardElt";
import { constants } from "./constants";
import { isInsideRect } from "./util";

class Ui {
    gfx: Gfx;
    private rootElt: BaseElt;
    private mouseX: number = 0;
    private mouseY: number = 0;

    constructor(gfx: Gfx) {
        this.gfx = gfx;

        this.addEventListener("mousedown", (e: any) => this.onLeftMBDown(e));
        this.addEventListener("mouseup",   (e: any) => this.onLeftMBUp(e));
        this.addEventListener("mousemove", (e: any) => {
            this.mouseX = e.offsetX;
            this.mouseY = e.offsetY;
        });

        this.rootElt = new BaseElt(
            this.gfx,
            { x: 0, y: 0, w: constants.canvasWidth, h: constants.canvasHeight }
        );

        this.rootElt.pushChild(
            new FretboardElt(
                this.gfx,
                { x: 10, y: 10, w: 20, h: 20 },
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

    tick() {
        this.gfx.clearScreen();

        // recursively draw all children, grandchildren, etc.
        this.rootElt.onDraw();

        this.gfx.draw();
    }

    private addEventListener(type: any, callback: any, options={}) {
        document.addEventListener(type, callback, options);
    }
}

export { Ui };
