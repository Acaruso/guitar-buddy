import { BaseElt } from "./ui_elts/BaseElt";
import { isInsideRect } from "./util";
import { Gfx } from "./Gfx";
import { RectElt } from "./ui_elts/RectElt";
import { constants } from "./constants";

class Ui {
    gfx: Gfx;
    private rootElt: BaseElt;
    private mouseX: number = 0;
    private mouseY: number = 0;
    private curLeftClickedElts: Array<any> = [];

    constructor(gfx: Gfx) {
        this.gfx = gfx;

        this.addEventListener("mousemove", (e: any) => {
            this.mouseX = e.offsetX;
            this.mouseY = e.offsetY;
        });

        this.addEventListener("mousedown", (e: any) => this.onLeftMBDown(e));
        this.addEventListener("mouseup", (e: any) => this.onLeftMBUp(e));

        this.rootElt = new BaseElt(
            this.gfx,
            { x: 0, y: 0, w: constants.canvasWidth, h: constants.canvasHeight }
        );

        const rect1 = new RectElt(
            this.gfx,
            { x: 10, y: 10, w: 20, h: 20 }
        );

        this.rootElt.pushChild(rect1);
    }

    onLeftMBDown(event: any) {
        console.log("mouse coord:");
        console.log(this.mouseX + " " + this.mouseY);

        let q = [];

        q.push(this.rootElt);

        let cur = null;
        let toLeftClick = [];

        while (q.length !== 0) {
            cur = q[0];
            q.shift();

            if (!isInsideRect(this.mouseX, this.mouseY, cur.rect)) {
                continue;
            }

            toLeftClick.push(cur);
            this.curLeftClickedElts.push(cur);

            for (const child of cur.children) {
                q.push(child);
            }
        }

        for (const elt of toLeftClick) {
            elt.onLeftMBDown(this.mouseX, this.mouseY);
        }
    }

    onLeftMBUp(event: any) {
        this.curLeftClickedElts = [];
    }

    private addEventListener(type: any, callback: any, options={}) {
        document.addEventListener(type, callback, options);
    }
}

export { Ui };
