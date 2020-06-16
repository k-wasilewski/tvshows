import React from 'react';
import {setDetailedResult} from '../../redux/actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {ErrorMsg} from '../misc/ErrorMsg';
import {styles} from '../../styles/styles';
import Button from '@material-ui/core/Button';

const createMarkup = (text) => {
    return {
        __html: text
    };
};

export function Details(props) {
    const result = props.detailedResult;
    const classes = styles();

    function resetDetailedResult() {
        props.setDetailedResult([]);
    }

    if (result.length===0) {
        return (
            <div className={classes.dashboard}>
                <ErrorMsg msg={'Należy wybrać element z listy'} />
                <Link to='/'><Button variant='outlined' size='small'>Powrót</Button></Link>
            </div>
            );
    } else {
        return (
            <div className={classes.dashboard}>
                <h2 className={classes.detailsHeader}>{result.show.name}</h2>
                <span className={classes.detailsSpan}
                      dangerouslySetInnerHTML={createMarkup(result.show.summary)} />
                <div>{
                    (result.show.image)===null ?
                    <Button variant='disabled' size='small'>brak zdjęcia</Button>
                    :
                    <img alt={`img-${result.show.name}`} src={result.show.image.medium} />
                }</div>
                <Link to='/'><Button variant='outlined' size='small'
                                     onClick={resetDetailedResult}>Powrót</Button></Link>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        detailedResult: state.setDetailedResultReducer.detailedResult
    };
};

const mapDispatchToProps = {
    setDetailedResult
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
