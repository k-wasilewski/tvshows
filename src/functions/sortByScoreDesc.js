export default function sortByScoreDesc(results) {
    return results.sort((a, b) => b.score - a.score );
}