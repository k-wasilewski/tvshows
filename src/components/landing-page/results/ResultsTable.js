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
import {setDetailedResult} from "../../../redux/actions";
import {connect} from "react-redux";
import {
    useStyles,
    TABLE_HEAD_STYLE,
    TABLE_ROW_STYLE,
    TABLE_STYLE,
    TABLE_CONTAINER_STYLE
} from "../../../styles/styles";

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

const StyledTableHeadRow = withStyles((theme) => (TABLE_HEAD_STYLE))(TableRow);

const StyledTableRow = withStyles((theme) => (TABLE_ROW_STYLE))(TableRow);

const StyledTable = withStyles((theme) => (TABLE_STYLE))(Table);

const StyledTableContainer = withStyles((theme) => (TABLE_CONTAINER_STYLE))(TableContainer);

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

    const tableWrapperClassName = (sortedResults===[]) ? classes.hidden : classes.tableWrapper;

    if (sortedResults.length===0) return <React.Fragment />
    else return (
        <StyledTableContainer component={Paper}>
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
        </StyledTableContainer>
    );
}

const mapStateToProps = state => ({
    detailedResult: state.setDetailedResultReducer.detailedResult
});

const mapDispatchToProps = { setDetailedResult };

export default connect(mapStateToProps, mapDispatchToProps)(ResultsTable);