class State {
    mouse: any = {
        clicked: false,
        coord: { x: 0, y: 0 },
    };

    keyboard: { [key: string]: boolean } = {
        arrowup: false,
        arrowdown: false,
        arrowright: false,
        arrowleft: false,
        control: false,
        shift: false,
        alt: false,
        tab: false,
        backspace: false,
        space: false,
        enter: false,
        escape: false,
        a: false,
        b: false,
        c: false,
        d: false,
        e: false,
        f: false,
        g: false,
        h: false,
        i: false,
        j: false,
        k: false,
        l: false,
        m: false,
        n: false,
        o: false,
        p: false,
        q: false,
        r: false,
        s: false,
        t: false,
        u: false,
        v: false,
        w: false,
        x: false,
        y: false,
        z: false,
    }
}

export { State };
