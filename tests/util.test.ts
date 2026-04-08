import { describe, expect, it } from "vitest";

import { clamp, inRange, modAddition, modDistance } from "../src/util";

describe("util", () => {
    it("clamp clamps low/high (high exclusive)", () => {
        expect(clamp(-1, 0, 10)).toBe(0);
        expect(clamp(0, 0, 10)).toBe(0);
        expect(clamp(9, 0, 10)).toBe(9);
        expect(clamp(10, 0, 10)).toBe(9);
        expect(clamp(999, 0, 10)).toBe(9);
    });

    it("inRange is low inclusive, high exclusive", () => {
        expect(inRange(0, 0, 10)).toBe(true);
        expect(inRange(9, 0, 10)).toBe(true);
        expect(inRange(10, 0, 10)).toBe(false);
        expect(inRange(-1, 0, 10)).toBe(false);
    });

    it("modDistance and modAddition behave", () => {
        expect(modDistance(3, 5, 12)).toBe(2);
        expect(modDistance(11, 1, 12)).toBe(2);
        expect(modAddition(11, 2, 12)).toBe(1);
        expect(modAddition(-1, 0, 12)).toBe(11);
    });
});
