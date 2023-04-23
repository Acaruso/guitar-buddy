import { Gfx } from "../Gfx";
import { Rect } from "../Rect";

class BaseElt {
    gfx: Gfx;
    public rect: Rect = new Rect();
    public children: Array<BaseElt> = [];
    public parent: any = null;

    constructor(gfx: Gfx, rect: Rect) {
        this.gfx = gfx;
        this.rect = rect;
    }

    onDraw() {
        for (const child of this.children) {
            child.onDraw();
        }
    }

    onLeftMBDown(x: number, y: number) {}

    onKeyDown(key: string) {
        for (const child of this.children) {
            child.onKeyDown(key);
        }
    }

    pushChild(child: any) {
        this.children.push(child);
    }
}

export { BaseElt };
