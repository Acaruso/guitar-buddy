function makeNoteDict() {
    const notes = [
        "A",
        "A#",
        "B",
        "C",
        "C#",
        "D",
        "D#",
        "E",
        "F",
        "F#",
        "G",
        "G#",
    ];

    let d = {};
    let idx = 0;

    for (let i = 0; i < 10; i++) {
        for (let k = 0; k < notes.length; k++) {
            d[idx++] = `${notes[k]}${i}`;
        }
    }

    console.log(d);
}

makeNoteDict();
