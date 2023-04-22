import { Rect } from "../Rect";
import { Gfx } from "../Gfx";

class BaseElt {
    gfx: Gfx;
    public rect: Rect = new Rect();
    public children: Array<BaseElt> = [];
    public parent: any = null;

    constructor(gfx: Gfx, rect: Rect) {
        this.gfx = gfx;
        this.rect = rect;
    }

    onDraw() {}

    onLeftMBDown(x: number, y: number) {}

    pushChild(child: any) {
        this.children.push(child);
    }
}

export { BaseElt };
