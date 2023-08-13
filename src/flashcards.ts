import { Flashcard } from "./Flashcard";

// const majorKeySharpsFlatsFlashcards = [
//     // new Flashcard("C major", "n/a"),
//     new Flashcard("G major", "F#"),
//     new Flashcard("D major", "F# C#"),
//     new Flashcard("A major", "F# C# G#"),
//     new Flashcard("E major", "F# C# G# D#"),
//     new Flashcard("B major", "F# C# G# D# A#"),

//     new Flashcard("F major", "Bb"),
//     new Flashcard("Bb major", "Bb Eb"),
//     new Flashcard("Eb major", "Bb Eb Ab"),
//     // new Flashcard("Ab major", "Bb Eb Ab Db"),
//     // new Flashcard("Db major", "Bb Eb Ab Db Gb"),
//     // new Flashcard("Gb major", "Bb Eb Ab Db Gb Cb"),
// ];

const majorKeySharpsFlatsFlashcards = [
    // new Flashcard("C major", "n/a"),
    new Flashcard("G major", "F#"),
    new Flashcard("D major", "C# F#"),
    new Flashcard("A major", "C# F# G#"),
    new Flashcard("E major", "C# D# F# G#"),
    new Flashcard("B major", "A# C# D# F# G#"),

    new Flashcard("F major", "Bb"),
    new Flashcard("Bb major", "Bb Eb"),
    new Flashcard("Eb major", "Ab Bb Eb"),
    // new Flashcard("Ab major", "Bb Eb Ab Db"),
    // new Flashcard("Db major", "Bb Eb Ab Db Gb"),
    // new Flashcard("Gb major", "Bb Eb Ab Db Gb Cb"),
];

// const majorKeySharpsFlatsFlashcards = [
//     new Flashcard("C major", "C D E F G A B"),
//     new Flashcard("G major", "G A B C D E F#"),
//     new Flashcard("D major", "D E F# G A B C#"),
//     new Flashcard("A major", "A B C# D E F# G#"),
//     new Flashcard("E major", "E F# G# A B C# D#"),
//     new Flashcard("B major", "B C# D# E F# G# A#"),

//     new Flashcard("F major", "F G A Bb C D E"),
//     new Flashcard("Bb major", "Bb C D Eb F G A"),
//     new Flashcard("Eb major", "Eb F G Ab Bb C D"),
//     // new Flashcard("Ab major", "Bb Eb Ab Db"),
//     // new Flashcard("Db major", "Bb Eb Ab Db Gb"),
//     // new Flashcard("Gb major", "Bb Eb Ab Db Gb Cb"),
// ];

const basicTriadFlashcards = [
    new Flashcard("A", "A C E"),
    new Flashcard("B", "B D F"),
    new Flashcard("C", "C E G"),
    new Flashcard("D", "D F A"),
    new Flashcard("E", "E G B"),
    new Flashcard("F", "F A C"),
    new Flashcard("G", "G B D"),
];

const fullMajorTriadFlashcards = [
    new Flashcard("A maj", "A C# E"),
    new Flashcard("B maj", "B D# F#"),
    new Flashcard("C maj", "C E G"),
    new Flashcard("D maj", "D F# A"),
    new Flashcard("E maj", "E G# B"),
    new Flashcard("F maj", "F A C"),
    new Flashcard("G maj", "G B D"),

    new Flashcard("Ab maj", "Ab C Eb"),
    new Flashcard("Bb maj", "Bb D F"),
    new Flashcard("Cb maj", "Cb Eb Gb"),
    new Flashcard("C# maj", "C# E# G#"),
    new Flashcard("Db maj", "Db F Ab"),
    new Flashcard("Eb maj", "Eb G Bb"),
    new Flashcard("F# maj", "F# A# C#"),
    new Flashcard("Gb maj", "Gb Bb Db"),
];

const fullMajorMinorTriadFlashcards = [
    new Flashcard("A maj",  "A C# E"),
    new Flashcard("B maj",  "B D# F#"),
    new Flashcard("C maj",  "C E G"),
    new Flashcard("D maj",  "D F# A"),
    new Flashcard("E maj",  "E G# B"),
    new Flashcard("F maj",  "F A C"),
    new Flashcard("G maj",  "G B D"),
    new Flashcard("Ab maj", "Ab C Eb"),
    new Flashcard("Bb maj", "Bb D F"),
    new Flashcard("Cb maj", "Cb Eb Gb"),
    new Flashcard("C# maj", "C# E# G#"),
    new Flashcard("Db maj", "Db F Ab"),
    new Flashcard("Eb maj", "Eb G Bb"),
    new Flashcard("F# maj", "F# A# C#"),
    new Flashcard("Gb maj", "Gb Bb Db"),

    new Flashcard("A min",  "A C E"),
    new Flashcard("B min",  "B D F#"),
    new Flashcard("C min",  "C Eb G"),
    new Flashcard("D min",  "D F A"),
    new Flashcard("E min",  "E G B"),
    new Flashcard("F min",  "F Ab C"),
    new Flashcard("G min",  "G Bb D"),
    new Flashcard("Bb min", "Bb Db F"),
    new Flashcard("C# min", "C# E G#"),
    new Flashcard("Db min", "Db Fb (E) Ab"),
    new Flashcard("Eb min", "Eb Gb Bb"),
    new Flashcard("F# min", "F# A C#"),
];

export {
    majorKeySharpsFlatsFlashcards,
    basicTriadFlashcards,
    fullMajorTriadFlashcards,
    fullMajorMinorTriadFlashcards,
};
