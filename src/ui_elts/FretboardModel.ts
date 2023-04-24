import { clamp, inRange } from "../util";

enum Dir {
    Up = 1,
    Down,
    Left,
    Right,
}

class Cell {
    toggled: boolean = false;
    note: number;
    noteString: string;

    constructor(note: number, noteString: string) {
        this.note = note;
        this.noteString = noteString;
    }
}

class FretboardModel {
    cells: Array<Array<Cell>>;
    numRows: number;
    numCols: number;

    selected: boolean = false;
    selectedRow: number = 0;
    selectedCol: number = 0;

    // low E is note 0

    notes: Array<string> = [
        "E0",   // 0
        "F0",   // 1
        "F#0",  // 2
        "G0",   // 3
        "G#0",  // 4
        "A0",   // 5
        "A#0",  // 6
        "B0",   // 7
        "C0",   // 8
        "C#0",  // 9
        "D0",   // 10
        "D#0",  // 11

        "E1",   // 12
        "F1",   // 13
        "F#1",  // 14
        "G1",   // 15
        "G#1",  // 16
        "A1",   // 17
        "A#1",  // 18
        "B1",   // 19
        "C1",   // 20
        "C#1",  // 21
        "D1",   // 22
        "D#1",  // 23

        "E2",   // 24
        "F2",   // 25
        "F#2",  // 26
        "G2",   // 27
        "G#2",  // 28
        "A2",   // 29
        "A#2",  // 30
        "B2",   // 31
        "C2",   // 32
        "C#2",  // 33
        "D2",   // 34
        "D#2",  // 35

        "E3",   // 36
        "F3",   // 37
        "F#3",  // 38
        "G3",   // 39
        "G#3",  // 40
        "A3",   // 41
        "A#3",  // 42
        "B3",   // 43
        "C3",   // 44
        "C#3",  // 45
        "D3",   // 46
        "D#3",  // 47

        "E4",   // 48
        "F4",   // 49
        "F#4",  // 50
        "G4",   // 51
        "G#4",  // 52
        "A4",   // 53
        "A#4",  // 54
        "B4",   // 55
        "C4",   // 56
        "C#4",  // 57
        "D4",   // 58
        "D#4",  // 59
    ];

    strangTuning: Array<number> = [
        24,     // high E
        19,
        15,
        10,
        5,
        0       // low E
    ];

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
                const note = this.strangTuning[row] + col + 1
                this.cells[row].push(
                    new Cell(note, this.noteToString(note))
                );
            }
        }
    }

    getCell(row: number, col: number) {
        return this.cells[row][col];
    }

    noteToStringFull(note: number) {
        if (!inRange(note, 0, this.notes.length)) {
            console.log(`ERROR: noteToStringFull(${note}) note out of range`);
        }
        return this.notes[note];
    }

    noteToString(note: number) {
        return this.noteToStringFull(note).replace(/[0-9]/g, "");
    }

    // "strang" === guitar string
    // not to be confused with "string" which is a data type

    strangFretToNote(strang: number, fret: number) {
        return this.strangTuning[strang] + (fret + 1);
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
        if (!this.isToggled(this.selectedRow, this.selectedCol)) {
            return;
        }

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

        this.moveSelected(dir);
    }

    moveNoteByOctave(dir: Dir, row: number, col: number) {
        let newRow = row;
        let newCol = col;

        switch (dir) {
            case Dir.Up: {
                newCol += 12;
                break;
            }
            case Dir.Down: {
                newCol -= 12;
                break;
            }
        }

        if (
            !inRange(newRow, 0, this.numRows)
            || !inRange(newCol, 0, this.numCols)
        ) {
            return { row, col };
        }

        return { row: newRow, col: newCol };
    }

    moveNoteByString(dir: Dir, row: number, col: number) {
        let newRow = row;
        let newCol = col;

        switch (dir) {
            case Dir.Up: {
                newRow--;
                break;
            }
            case Dir.Down: {
                newRow++;
                break;
            }
        }

        if (
            !inRange(newRow, 0, this.numRows)
            || !inRange(newCol, 0, this.numCols)
        ) {
            return { row, col };
        }
    }
}

export { Cell, FretboardModel, Dir };
