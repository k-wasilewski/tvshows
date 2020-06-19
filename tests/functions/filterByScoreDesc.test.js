import sortByScoreDesc from "../../src/functions/sortByScoreDesc";

describe("filterByScoreDesc functional specification", () => {
    it('filterByScoreDesc() filters results by score descending', () => {
        const result1 = {show: {
                name: 'sample name',
                genres: ['sample genre']
            },
            score: 1
        };
        const result4 = {
            show: {
                name: 'sample name',
                genres: ['sample genre']
            },
            score: 4
        };
        const result3 = {
            show: {
                name: 'sample name',
                genres: ['sample genre']
            },
            score: 3
        };
        const result6 = {
            show: {
                name: 'sample name',
                genres: ['sample genre']
            },
            score: 6
        };

        const results = [result1, result4, result3, result6];

        expect(sortByScoreDesc(results)).toStrictEqual(
            [result6, result4, result3, result1]);
    });
});