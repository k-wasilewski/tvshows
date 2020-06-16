import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useHistory } from "react-router-dom";
import {setDetailedResult} from "../redux/actions";
import {connect} from "react-redux";
import {useStyles, BACKGROUND_COLOR} from "./useStyles";

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

const StyledTableHeadRow = withStyles((theme) => ({
    root: {
        '& *': {
            fontFamily: 'Lato Heavy',
            fontSize: '1.1rem'
        }
    }
}))(TableRow);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:hover': {
            backgroundColor: 'lightgray',
            cursor: 'pointer'
        }
    }
}))(TableRow);

const StyledTable = withStyles((theme) => ({
    root: {
        backgroundColor: BACKGROUND_COLOR
    }
}))(Table);

export function ResultsTable(props) {
    const classes = useStyles();
    const [sortedResults, setSortedResults] = React.useState([]);

    const history = useHistory();

    function rowClicked(event, result) {
        props.setDetailedResult(result);
        history.push("/details");
    }

    React.useEffect( () => {
        setSortedResults(props.results.sort((a, b) => b.score - a.score));
    }, [props.results])

    return (
        <TableContainer className={classes.tableWrapper} component={Paper} id='tableWrapper'>
            <StyledTable aria-label="results table">
                <TableHead>
                    <StyledTableHeadRow>
                        <TableCell>Ocena</TableCell>
                        <TableCell align="right">Tytuł</TableCell>
                        <TableCell align="right">Gatunki</TableCell>
                        <TableCell align="right">Data premiery</TableCell>
                    </StyledTableHeadRow>
                </TableHead>
                <TableBody>
                    {sortedResults.map((result) => (
                        <StyledTableRow key={result.show.name} onClick={event => rowClicked(event, result)}>
                            <TableCell component="th" scope="row">{result.score}</TableCell>
                            <TableCell align="right">{result.show.name}</TableCell>
                            <TableCell align="right">{mappedGenres(result.show.genres)}</TableCell>
                            <TableCell align="right">{result.show.premiered}</TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </StyledTable>
        </TableContainer>
    );
}

const mapStateToProps = state => ({
    detailedResult: state.setDetailedResultReducer.detailedResult
});

const mapDispatchToProps = { setDetailedResult };

export default connect(mapStateToProps, mapDispatchToProps)(ResultsTable);