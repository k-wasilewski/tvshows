import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const mappedGenres = (genres) => {
    if (genres.length===1) return genres;
    else {
        return genres.map(genre => {
            if (genres.indexOf(genre)!==genres.length-1)
                return genre+=', ';
            else return genre;
        });
    }
}

export default function ResultsTable(props) {
    const classes = useStyles();
    const [sortedResults, setSortedResults] = React.useState([]);

    const history = useHistory();

    function rowClicked(event, result) {
        alert(result.show.name)
        history.push("/details");
    }

    React.useEffect( () => {
        setSortedResults(props.results.sort((a, b) => b.score - a.score));
    }, [props.results])

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Ocena</TableCell>
                        <TableCell align="right">Tytuł</TableCell>
                        <TableCell align="right">Gatunki</TableCell>
                        <TableCell align="right">Data premiery</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedResults.map((result) => (
                        <TableRow key={result.show.name} onClick={event => rowClicked(event, result)}>
                            <TableCell component="th" scope="row">{result.score}</TableCell>
                            <TableCell align="right">{result.show.name}</TableCell>
                            <TableCell align="right">{mappedGenres(result.show.genres)}</TableCell>
                            <TableCell align="right">{result.show.premiered}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}