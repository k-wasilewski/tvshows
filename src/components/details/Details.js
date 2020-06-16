import React from 'react';
import {setDetailedResult} from '../../redux/actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {ErrorMsg} from '../misc/ErrorMsg';
import {styles} from '../../styles/styles';

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
                <Link to='/'><button>Powrót</button></Link>
            </div>
            );
    } else {
        return (
            <React.Fragment>
                <h2 className={classes.detailsHeader}>{result.show.name}</h2>
                <span className={classes.detailsSpan} dangerouslySetInnerHTML={createMarkup(result.show.summary)} />
                <div><img alt={`img-${result.show.name}`} src={result.show.image.medium} /></div>
                <Link to='/'><button onClick={resetDetailedResult}>Powrót</button></Link>
            </React.Fragment>
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
