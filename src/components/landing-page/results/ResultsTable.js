import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from 'react-router-dom';
import {setDetailedResult} from "../../../redux/actions";
import {connect} from "react-redux";
import {
    TABLE_HEAD_STYLE,
    TABLE_ROW_STYLE,
    TABLE_STYLE,
    TABLE_CONTAINER_STYLE,
    TABLE_CELL_STYLE
} from '../../../styles/styles';
import sortByScoreDesc from "../../../functions/sortByScoreDesc";

const mappedGenres = (genres) => {
    return genres.map(genre => {
        if (genres.indexOf(genre)!==genres.length-1)
            return genre+=', ';
        else return genre;
    });
};

const StyledTableHeadRow = withStyles((theme) => (TABLE_HEAD_STYLE))(TableRow);

const StyledTableRow = withStyles((theme) => (TABLE_ROW_STYLE))(TableRow);

const StyledTable = withStyles((theme) => (TABLE_STYLE))(Table);

const StyledTableContainer = withStyles((theme) => (TABLE_CONTAINER_STYLE))(TableContainer);

const StyledTableCell = withStyles((theme) => (TABLE_CELL_STYLE))(TableCell);

export function ResultsTable(props) {
    const [sortedResults, setSortedResults] = React.useState([]);
    const history = useHistory();

    React.useEffect( () => {
        if (props.results!==undefined) {
            if (sortedResults!==props.results)
                setSortedResults(sortByScoreDesc(Array.from(props.results)));
        }
    }, [props.results]);    //eslint-disable-line react-hooks/exhaustive-deps

    function rowClicked(event, result) {
        props.setDetailedResult(result);
        history.push('/details');
    }

    if (sortedResults.length===0) return <React.Fragment />
    else return (
        <StyledTableContainer component={Paper}>
            <StyledTable aria-label='results table'>
                <TableHead>
                    <StyledTableHeadRow>
                        <StyledTableCell>Ocena</StyledTableCell>
                        <StyledTableCell align='right'>Tytuł</StyledTableCell>
                        <StyledTableCell align='right'>Gatunki</StyledTableCell>
                        <StyledTableCell align='right'>Data premiery</StyledTableCell>
                    </StyledTableHeadRow>
                </TableHead>
                <TableBody>
                    {sortedResults.map((result, index) => (
                        <Tooltip key={`tooltip-${result.score}${result.show.name}${index}`}
                                 title={`Szczegóły serialu ${result.show.name}`}
                                 placement='top-end'>
                            <StyledTableRow className='resultsTable-row'
                                            key={`${result.score}${result.show.name}${index}`}
                                            onClick={event => rowClicked(event, result)}>
                                <StyledTableCell component='th' scope='row'>
                                    {result.score}
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                    {result.show.name}
                                </StyledTableCell>
                                <StyledTableCell id='resultsTable-genresCell' align='right'>
                                    {mappedGenres(result.show.genres)}
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                    {result.show.premiered}
                                </StyledTableCell>
                            </StyledTableRow>
                        </Tooltip>
                    ))}
                </TableBody>
            </StyledTable>
        </StyledTableContainer>
    );
};

const mapDispatchToProps = {
    setDetailedResult
};

export default connect(null, mapDispatchToProps)(ResultsTable);