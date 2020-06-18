import mapDayNoToName from "../../src/functions/mapDayNoToName";

describe("mapDayNoToName functional specification", () => {
    it('mapDayNoToName() maps number of day in a week to day name', () => {
        expect(mapDayNoToName(1)).toBe('Monday');
        expect(mapDayNoToName(2)).toBe('Tuesday');
        expect(mapDayNoToName(3)).toBe('Wednesday');
        expect(mapDayNoToName(4)).toBe('Thursday');
        expect(mapDayNoToName(5)).toBe('Friday');
        expect(mapDayNoToName(6)).toBe('Saturday');
        expect(mapDayNoToName(7)).toBe('Sunday');
    });
});