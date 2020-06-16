import React from 'react';
import {setDetailedResult} from '../../redux/actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {ErrorMsg} from '../misc/ErrorMsg';
import {useStyles} from "../../styles/styles";

const createMarkup = (text) => {
    return {
        __html: text
    };
};

export function Details(props) {
    const result = props.detailedResult;
    const classes = useStyles();

    if (result.length===0) {
        return (<ErrorMsg msg={'Należy wybrać element z listy'} />)
    } else {
        return (
            <div className={classes.App}>
                <h2>{result.show.name}</h2>
                <span dangerouslySetInnerHTML={createMarkup(result.show.summary)} />
                <div><img alt={`img-${result.show.name}`} src={result.show.image.medium} /></div>
                <Link to='/'><button>Powrót</button></Link>
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
