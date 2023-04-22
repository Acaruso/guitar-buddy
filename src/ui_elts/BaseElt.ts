import { Rect } from "../Rect";

interface IBaseElt {
    rect: Rect;
    children: Array<any>;
    parent: any;

    onDraw: () => void;
    onLeftMBDown: (x: number, y: number) => void;
};

class BaseElt implements IBaseElt {
    public rect: Rect = new Rect();
    public children: Array<any> = [];
    public parent: any = null;

    constructor() {}

    onDraw() {}

    onLeftMBDown(x: number, y: number) {

    }
}

export { IBaseElt, BaseElt };
