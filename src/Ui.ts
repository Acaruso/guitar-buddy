import { IBaseElt, BaseElt } from "./ui_elts/BaseElt";
import { isInsideRect } from "./util";

class Ui {
    private rootElt: IBaseElt = new BaseElt();
    private mouseX: number = 0;
    private mouseY: number = 0;
    private curLeftClickedElts: Array<any> = [];

    constructor() {
        this.addEventListener("mousemove", (e: any) => {
            this.mouseX = e.offsetX;
            this.mouseY = e.offsetY;
        });

        this.addEventListener("mousedown", (e: any) => this.onLeftMBDown(e));
        this.addEventListener("mouseup", (e: any) => this.onLeftMBUp(e));
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
