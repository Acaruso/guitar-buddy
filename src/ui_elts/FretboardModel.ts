import { clamp, inRange } from "../util";
import { constants } from "../constants";

enum Dir {
    Up = 1,
    Down,
    Left,
    Right,
}

enum GlobalLocalMode {
    Local = 1,
    Global,
}

enum AbsoluteRelativeMode {
    Absolute = 1,
    Relative,
}

class Cell {
    toggled: boolean = false;
    note: number;
    noteString: string;
    color: string = constants.black;
    ring: boolean = false;

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

    secondaryCursor: boolean = false;
    secondaryCursorRow: number = 0;
    secondaryCursorCol: number = 0;
    secondaryToPrimaryInterval: number = 0;

    globalLocalMode: GlobalLocalMode = GlobalLocalMode.Local;

    absoluteRelativeMode: AbsoluteRelativeMode = AbsoluteRelativeMode.Absolute;

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

    // "strang" === guitar string
    // not to be confused with "string" which is a data type

    strangs: Array<number> = [
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
                const note = this.strangs[row] + col + 1
                this.cells[row].push(
                    new Cell(note, this.noteToString(note))
                );
            }
        }
    }

    toggleGlobalLocalMode() {
        if (this.globalLocalMode === GlobalLocalMode.Local) {
            this.globalLocalMode = GlobalLocalMode.Global;
        } else {
            this.globalLocalMode = GlobalLocalMode.Local;
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

    strangFretToNote(strang: number, fret: number) {
        return this.strangs[strang] + (fret + 1);
    }

    setToggle(row: number, col: number) {
        if (this.globalLocalMode === GlobalLocalMode.Local) {
            this.setToggleLocal(row, col);
            if (!this.isToggled(row, col)) {
                this.setColorLocal(constants.black, row, col);
            }

            if (this.secondaryCursor) {
                this.setToggleLocal(this.secondaryCursorRow, this.secondaryCursorCol);
                if (!this.isToggled(this.secondaryCursorRow, this.secondaryCursorCol)) {
                    this.setColorLocal(constants.black, this.secondaryCursorRow, this.secondaryCursorCol);
                }
            }
        } else if (this.globalLocalMode === GlobalLocalMode.Global) {
            this.setToggleGlobal(row, col);
            if (!this.isToggled(row, col)) {
                this.setColorGlobal(constants.black, row, col);
            }
        }
    }

    setToggleLocal(row: number, col: number) {
        this.cells[row][col].toggled = !this.cells[row][col].toggled;
    }

    setToggleGlobal(row: number, col: number) {
        const newToggleValue = !this.cells[row][col].toggled;

        const base = this.cells[row][col].note % 12;

        for (const row of this.cells) {
            for (let cell of row) {
                if (cell.note % 12 === base) {
                    cell.toggled = newToggleValue;
                }
            }
        }
    }

    isToggled(row: number, col: number) {
        return this.cells[row][col].toggled;
    }

    untoggleAll() {
        for (const row of this.cells) {
            for (const cell of row) {
                cell.toggled = false;
                cell.color = constants.black;
            }
        }
        this.unselect();
    }

    setColor(color: string, row: number, col: number) {
        if (this.globalLocalMode === GlobalLocalMode.Local) {
            this.setColorLocal(color, row, col);
        } else if (this.globalLocalMode === GlobalLocalMode.Global) {
            this.setColorGlobal(color, row, col);
        }
    }

    setColorLocal(color: string, row: number, col: number) {
        this.cells[row][col].color = color;
    }

    setColorGlobal(color: string, row: number, col: number) {
        const base = this.cells[row][col].note % 12;

        for (const row of this.cells) {
            for (let cell of row) {
                if (cell.note % 12 === base) {
                    cell.color = color;
                }
            }
        }
    }

    // set the color of all currently toggled notes
    setColorAllToggled(color: string) {
        for (const row of this.cells) {
            for (let cell of row) {
                if (cell.toggled) {
                    cell.color = color;
                }
            }
        }
    }

    getColor(row: number, col: number) {
        return this.cells[row][col].color;
    }

    setRing(row: number, col: number) {
        if (this.globalLocalMode === GlobalLocalMode.Local) {
            this.setRingLocal(row, col);
        } else if (this.globalLocalMode === GlobalLocalMode.Global) {
            this.setRingGlobal(row, col);
        }
    }

    setRingLocal(row: number, col: number) {
        const curCell = this.cells[row][col];
        curCell.ring = !curCell.ring;
    }

    setRingGlobal(row: number, col: number) {
        const curCell = this.cells[row][col];
        const baseNote = curCell.note % 12;
        const newRing = !curCell.ring;

        for (const row of this.cells) {
            for (let cell of row) {
                if (cell.note % 12 === baseNote) {
                    cell.ring = newRing;
                }
            }
        }
    }

    setSelected(row: number, col: number) {
        this.selected = true;

        if (this.secondaryCursor) {
            const rowDelta = row - this.selectedRow;
            const colDelta = col - this.selectedCol;

            const oldSecondaryNote = this.strangFretToNote(
                this.secondaryCursorRow,
                this.secondaryCursorCol
            );

            const oldPrimaryNote = this.strangFretToNote(
                this.selectedRow,
                this.selectedCol
            );

            const newPrimaryNote = this.strangFretToNote(
                row,
                col
            );

            const targetNote = newPrimaryNote + this.secondaryToPrimaryInterval;

            this.secondaryCursorRow += rowDelta;

            for (let i = 0; i < this.numCols; i++) {
                if (this.strangFretToNote(this.secondaryCursorRow, i) === targetNote) {
                    this.secondaryCursorCol = i;
                    break;
                }
            }
        }

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
        this.secondaryCursor = false;
    }

    moveSelected(dir: Dir) {
        const { newRow, newCol } = move(
            dir,
            this.selectedRow,
            this.selectedCol,
            this.numRows,
            this.numCols
        );

        this.setSelected(newRow, newCol);
    }

    setSecondaryCursor(row: number, col: number) {
        if (
            this.selected
            && !(
                row === this.selectedRow
                && col === this.selectedCol
            )
        ) {
            this.secondaryCursor = true;
            this.secondaryCursorRow = row;
            this.secondaryCursorCol = col;

            const primaryNote   = this.strangFretToNote(this.selectedRow, this.selectedCol);
            const secondaryNote = this.strangFretToNote(this.secondaryCursorRow, this.secondaryCursorCol);
            this.secondaryToPrimaryInterval = secondaryNote - primaryNote;
        }
    }

    isSecondaryCursor(row: number, col: number) {
        return (
            this.secondaryCursor
            && this.secondaryCursorRow === row
            && this.secondaryCursorCol === col
        );
    }

    moveToggle(dir: Dir, row: number, col: number) {
        if (!this.isToggled(this.selectedRow, this.selectedCol)) {
            return;
        }

        const { newRow, newCol } = move(
            dir,
            row,
            col,
            this.numRows,
            this.numCols
        );

        if (this.getCell(newRow, newCol).toggled) {
            return;
        }

        this.setToggle(row, col);
        this.setToggle(newRow, newCol);

        this.setSelected(newRow, newCol);
    }

    moveToggleByOctave(dir: Dir, row: number, col: number) {
        if (
            !this.isToggled(this.selectedRow, this.selectedCol)
            || (dir !== Dir.Left && dir !== Dir.Right)
        ) {
            return;
        }

        const { newRow, newCol } = move(
            dir,
            row,
            col,
            this.numRows,
            this.numCols,
            12
        );

        if (this.getCell(newRow, newCol).toggled) {
            return;
        }

        this.setToggle(row, col);
        this.setToggle(newRow, newCol);

        this.setSelected(newRow, newCol);
    }

    moveToggleByString(dir: Dir, row: number, col: number) {
        if (
            !this.isToggled(this.selectedRow, this.selectedCol)
            || (dir !== Dir.Up && dir !== Dir.Down)
        ) {
            return;
        }

        const { newRow, newCol } = move(
            dir,
            row,
            col,
            this.numRows,
            this.numCols
        );

        if (newRow === row && newCol === col) {
            return;
        }

        let curNote = this.getCell(row, col).note;

        const notePositions = this.findNotePositions(curNote, newRow);

        const newNewCol = notePositions[0];

        this.setToggle(row, col);
        this.setToggle(newRow, newNewCol);

        this.setSelected(newRow, newNewCol);
    }

    findNotePositions(note: number, strang: number) {
        const base = note % 12;
        let strangNote = this.strangs[strang];
        let res = [];

        for (let i = 0; i < this.numCols; i++, strangNote++) {
            if (strangNote % 12 === base) {
                if ((i - 1) >= 0) {
                    res.push(i - 1);
                }
            }
        }

        return res;
    }
}

function move(
    dir: Dir,
    row: number,
    col: number,
    numRows: number,
    numCols: number,
    inc: number = 1
) {
    let newRow = row;
    let newCol = col;

    switch (dir) {
        case Dir.Up:
            newRow -= inc;
            break;
        case Dir.Down:
            newRow += inc;
            break;
        case Dir.Left:
            newCol -= inc;
            break;
        case Dir.Right:
            newCol += inc;
            break;
    }

    if (!inRange(newRow, 0, numRows) || !inRange(newCol, 0, numCols)) {
        return { newRow: row, newCol: col };
    }

    return { newRow, newCol };
}

export { Cell, FretboardModel, Dir, GlobalLocalMode };
