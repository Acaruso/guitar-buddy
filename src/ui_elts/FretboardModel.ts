import { clamp } from "../util";

class Cell {
    toggled: boolean = false;
}

class FretboardModel {
    cells: Array<Array<Cell>>;
    numRows: number;
    numCols: number;

    selected: boolean = false;
    selectedRow: number = 0;
    selectedCol: number = 0;

    constructor(
        numRows: number,
        numCols: number
    ) {
        this.numRows = numRows;
        this.numCols = numCols;

        this.cells = [];

        for (let row = 0; row < numRows; row++) {
            this.cells.push([]);
            for (let col = 0; col < numCols; col++) {
                this.cells[row].push(new Cell());
            }
        }
    }

    toggle(row: number, col: number) {
        this.cells[row][col].toggled = !this.cells[row][col].toggled;
    }

    isToggled(row: number, col: number) {
        return this.cells[row][col].toggled;
    }

    setSelected(row: number, col: number) {
        this.selected = true;
        this.selectedRow = row;
        this.selectedCol = col;
    }

    isSelected(row: number, col: number) {
        return (
            this.selected
            && this.selectedRow === row
            && this.selectedCol === col
        );
    }

    moveSelectedUp() {
        console.log("moveSelectedUp");
        this.selectedRow = clamp(this.selectedRow - 1, 0, this.numRows);
    }

    moveSelectedDown() {
        console.log("moveSelectedDown");
        this.selectedRow = clamp(this.selectedRow + 1, 0, this.numRows);
    }

    moveSelectedLeft() {
        this.selectedCol = clamp(this.selectedCol - 1, 0, this.numCols);
    }

    moveSelectedRight() {
        this.selectedCol = clamp(this.selectedCol + 1, 0, this.numCols);
    }
}

export { Cell, FretboardModel };
