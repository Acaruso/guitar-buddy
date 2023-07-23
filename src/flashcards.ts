import { Flashcard } from "./Flashcard";

const majorKeySharpsFlatsFlashcards = [
    // new Flashcard("C major", "n/a"),
    new Flashcard("G major", "F#"),
    new Flashcard("D major", "F# C#"),
    new Flashcard("A major", "F# C# G#"),
    new Flashcard("E major", "F# C# G# D#"),
    new Flashcard("B major", "F# C# G# D# A#"),

    new Flashcard("F major", "Bb"),
    new Flashcard("Bb major", "Bb Eb"),
    new Flashcard("Eb major", "Bb Eb Ab"),
    // new Flashcard("Ab major", "Bb Eb Ab Db"),
    // new Flashcard("Db major", "Bb Eb Ab Db Gb"),
    // new Flashcard("Gb major", "Bb Eb Ab Db Gb Cb"),
];

const basicTriadFlashcards = [
    new Flashcard("A", "A C E"),
    new Flashcard("B", "B D F"),
    new Flashcard("C", "C E G"),
    new Flashcard("D", "D F A"),
    new Flashcard("E", "E G B"),
    new Flashcard("F", "F A C"),
    new Flashcard("G", "G B D"),
];

const fullTriadFlashcards = [
    new Flashcard("A maj", "A C# E"),
    new Flashcard("B maj", "B D# F#"),
    new Flashcard("C maj", "C E G"),
    new Flashcard("D maj", "D F# A"),
    new Flashcard("E maj", "E G# B"),
    new Flashcard("F maj", "F A C"),
    new Flashcard("G maj", "G B D"),

    new Flashcard("A min", "A C E"),
    new Flashcard("B min", "B D F#"),
    new Flashcard("C min", "C Eb G"),
    new Flashcard("D min", "D F A"),
    new Flashcard("E min", "E G B"),
    new Flashcard("F min", "F Ab C"),
    new Flashcard("G min", "G Bb D"),
];

export { majorKeySharpsFlatsFlashcards, basicTriadFlashcards, fullTriadFlashcards };
