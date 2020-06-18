export default function filterByScoreDesc(results) {
    return results.sort((a, b) => b.score - a.score );
}