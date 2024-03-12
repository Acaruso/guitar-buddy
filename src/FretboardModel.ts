import { clamp, inRange } from "./util";
import { constants } from "./constants";
import { notesDict } from "./notesDict"

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

enum NoteDisplayMode {
    String = 1,
    AbsoluteNumber,
    RelativeNumber,
}

enum StringMode {
    Normal = 1,
    Infinite,
}

// use this functionto get next NoteDisplayMode:
// function getNextNoteDisplayMode(m: NoteDisplayMode)

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

    stringMode: StringMode;

    selected: boolean = false;
    selectedRow: number = 0;
    selectedCol: number = 0;

    secondaryCursor: boolean = false;
    secondaryCursorRow: number = 0;
    secondaryCursorCol: number = 0;
    secondaryToPrimaryInterval: number = 0;

    globalLocalMode: GlobalLocalMode = GlobalLocalMode.Local;

    absoluteRelativeMode: AbsoluteRelativeMode = AbsoluteRelativeMode.Absolute;

    notes: { [key: string]: string } = notesDict;

    // "strang" === guitar string
    // not to be confused with "string" which is a data type

    // strangs: Array<number> = [
    //     31,     // high E
    //     26,
    //     22,
    //     17,
    //     12,
    //     7       // low E
    // ];

    strangs: Array<number> = [];

    constructor(
        numRows: number,
        numCols: number,
        stringMode: StringMode,
    ) {
        this.numRows = numRows;
        this.numCols = numCols;
        this.stringMode = stringMode;

        if (this.stringMode == StringMode.Normal) {
            this.strangs = [
                31,     // high E
                26,
                22,
                17,
                12,
                7       // low E
            ];
        } else if (this.stringMode == StringMode.Infinite) {
            let counter = 7;
            for (let i = 0; i < numRows; i++) {
                this.strangs.push(counter);
                counter += 5;
            }
            this.strangs.reverse();
        }

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

    toggleAbsoluteRelativeMode() {
        if (this.absoluteRelativeMode === AbsoluteRelativeMode.Absolute) {
            this.absoluteRelativeMode = AbsoluteRelativeMode.Relative;
        } else {
            this.absoluteRelativeMode = AbsoluteRelativeMode.Absolute;
        }
    }

    getAbsoluteRelativeMode(): AbsoluteRelativeMode {
        return this.absoluteRelativeMode;
    }

    getCell(row: number, col: number): Cell {
        return this.cells[row][col];
    }

    noteToStringFull(note: number): string {
        if (!this.notes.hasOwnProperty(String(note))) {
            console.log(`ERROR: noteToStringFull(${note}) note out of range`);
        }
        return this.notes[String(note)];
    }

    noteToString(note: number): string {
        return this.noteToStringFull(note).replace(/[0-9]/g, "");
    }

    strangFretToNote(strang: number, fret: number): number {
        return this.strangs[strang] + (fret + 1);
    }

    setToggle(row: number, col: number): void {
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

    setToggleLocal(row: number, col: number): void {
        this.cells[row][col].toggled = !this.cells[row][col].toggled;
    }

    setToggleGlobal(row: number, col: number): void {
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

    isToggled(row: number, col: number): boolean {
        return this.cells[row][col].toggled;
    }

    untoggleAll(): void {
        for (const row of this.cells) {
            for (const cell of row) {
                cell.toggled = false;
                cell.color = constants.black;
            }
        }
        this.unselect();
    }

    setColor(color: string, row: number, col: number): void {
        if (this.globalLocalMode === GlobalLocalMode.Local) {
            this.setColorLocal(color, row, col);
        } else if (this.globalLocalMode === GlobalLocalMode.Global) {
            this.setColorGlobal(color, row, col);
        }
    }

    setColorLocal(color: string, row: number, col: number): void {
        this.cells[row][col].color = color;
    }

    setColorGlobal(color: string, row: number, col: number): void {
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
    setColorAllToggled(color: string): void {
        for (const row of this.cells) {
            for (let cell of row) {
                if (cell.toggled) {
                    cell.color = color;
                }
            }
        }
    }

    getColor(row: number, col: number): string {
        return this.cells[row][col].color;
    }

    setRing(row: number, col: number): void {
        if (this.globalLocalMode === GlobalLocalMode.Local) {
            this.setRingLocal(row, col);
        } else if (this.globalLocalMode === GlobalLocalMode.Global) {
            this.setRingGlobal(row, col);
        }
    }

    setRingLocal(row: number, col: number): void {
        const curCell = this.cells[row][col];
        curCell.ring = !curCell.ring;
    }

    setRingGlobal(row: number, col: number): void {
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

    setSelected(row: number, col: number): void {
        this.selected = true;

        if (this.secondaryCursor) {
            const rowDelta = row - this.selectedRow;

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

    unselect(): void {
        this.selected = false;
        this.secondaryCursor = false;
    }

    moveSelected(dir: Dir): void {
        const { newRow, newCol } = move(
            dir,
            this.selectedRow,
            this.selectedCol,
            this.numRows,
            this.numCols
        );

        this.setSelected(newRow, newCol);
    }

    setSecondaryCursor(row: number, col: number): void {
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

    moveToggle(dir: Dir, row: number, col: number): void {
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

    moveToggleByOctave(dir: Dir, row: number, col: number): void {
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

    moveToggleByString(dir: Dir, row: number, col: number): void {
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

function getNextNoteDisplayMode(m: NoteDisplayMode) {
    switch (m) {
        case NoteDisplayMode.String:
            return NoteDisplayMode.AbsoluteNumber;
        case NoteDisplayMode.AbsoluteNumber:
            return NoteDisplayMode.RelativeNumber;
        case NoteDisplayMode.RelativeNumber:
            return NoteDisplayMode.String;
    }
}

export { Cell, FretboardModel, Dir, GlobalLocalMode, AbsoluteRelativeMode, StringMode };
