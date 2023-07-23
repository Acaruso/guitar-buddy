class Flashcard {
    text1: string;
    text2: string;
    flipped: boolean;

    constructor(text1: string, text2: string) {
        this.text1 = text1;
        this.text2 = text2;
        this.flipped = false;
    }

    getText() {
        return !this.flipped ? this.text1 : this.text2;
    }

    flip() {
        this.flipped = !this.flipped;
    }
}

export { Flashcard };
