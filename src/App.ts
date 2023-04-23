import { Gfx } from "./Gfx";
import { Ui } from "./Ui";
import { constants } from "./constants";

class App {
    gfx: Gfx;
    ui: Ui;
    canvas: any;

    constructor() {
        this.canvas = document.getElementById("myCanvas");
        this.canvas.width = constants.canvasWidth;
        this.canvas.height = constants.canvasHeight;

        this.gfx = new Gfx();
        this.ui = new Ui(this.gfx);

        setInterval(() => this.tick(), 1000 / 30);
    }

    tick() {
        this.ui.tick();
    }
}

export { App };
