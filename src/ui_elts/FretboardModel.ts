import { clamp, inRange } from "../util";

enum Dir {
    Up = 1,
    Down,
    Left,
    Right,
}

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

    unselect() {
        this.selected = false;
    }

    untoggleAll() {
        for (const row of this.cells) {
            for (const cell of row) {
                cell.toggled = false;
            }
        }
    }

    moveSelected(dir: Dir) {
        switch (dir) {
            case Dir.Up:
                this.selectedRow = clamp(this.selectedRow - 1, 0, this.numRows);
                break;
            case Dir.Down:
                this.selectedRow = clamp(this.selectedRow + 1, 0, this.numRows);
                break;
            case Dir.Left:
                this.selectedCol = clamp(this.selectedCol - 1, 0, this.numCols);
                break;
            case Dir.Right:
                this.selectedCol = clamp(this.selectedCol + 1, 0, this.numCols);
                break;
        }
    }

    moveToggle(dir: Dir, row: number, col: number) {
        switch (dir) {
            case Dir.Up: {
                const newRow = row - 1;
                if (inRange(newRow, 0, this.numRows)) {
                    this.toggle(row, col);
                    this.toggle(newRow, col);
                }
                break;
            }
            case Dir.Down: {
                const newRow = row + 1;
                if (inRange(newRow, 0, this.numRows)) {
                    this.toggle(row, col);
                    this.toggle(newRow, col);
                }
                break;
            }
            case Dir.Left: {
                const newCol = col - 1;
                if (inRange(newCol, 0, this.numCols)) {
                    this.toggle(row, col);
                    this.toggle(row, newCol);
                }
                break;
            }
            case Dir.Right: {
                const newCol = col + 1;
                if (inRange(newCol, 0, this.numCols)) {
                    this.toggle(row, col);
                    this.toggle(row, newCol);
                }
                break;
            }
        }
    }
}

export { Cell, FretboardModel, Dir };
