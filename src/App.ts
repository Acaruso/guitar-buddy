import { Gfx } from "./Gfx";
import { State } from "./State";
import { Ui } from "./Ui";
import { constants } from "./constants";

class App {
    gfx: Gfx;
    state: State;
    ui: Ui;
    canvas: any;

    constructor() {
        console.log("TEST!!")
        this.canvas = document.getElementById("myCanvas");
        this.canvas.width = constants.canvasWidth;
        this.canvas.height = constants.canvasHeight;

        this.gfx = new Gfx();
        this.state = new State();
        this.ui = new Ui(this.gfx, this.state);

        setInterval(() => this.tick(), 1000 / 30);
    }

    tick() {
        this.ui.tick();
    }
}

export { App };
