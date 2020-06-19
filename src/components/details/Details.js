import React from 'react';
import {setDetailedResult, setOriginalImage} from '../../redux/actions';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {ErrorMsg} from '../misc/ErrorMsg';
import {styles} from '../../styles/styles';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import MediumImage from "./MediumImage";

const createMarkup = (text) => {
    return {
        __html: text
    };
};

export function Details(props) {
    const result = (props.detailedResult===undefined) ? [] : props.detailedResult;
    const classes = styles();
    const history = useHistory();

    function resetDetailedResult() {
        props.setDetailedResult([]);
    }

    if (result.length===0) {
        return (
            <div className={classes.dashboard}>
                <ErrorMsg msg={'Należy wybrać element z listy'} />
                <Button variant='outlined' size='small' onClick={() => history.push('/')}>
                    Powrót</Button>
            </div>
            );
    } else {
        return (
            <React.Fragment>
                <div className={classes.dashboard}>
                    <Typography variant="h5" component="h2" className={classes.detailsHeader}>
                        {result.show.name}
                    </Typography>
                    <Button variant='outlined' size='small' onClick={() => {
                        resetDetailedResult();
                        history.push('/');
                    }}>
                        Powrót
                    </Button>
                    <Typography variant="body1" component="h2" className={classes.detailsSpan}
                        dangerouslySetInnerHTML={createMarkup(result.show.summary)} />
                    {(result.show.image)===null ?
                        <Button variant='disabled' size='small'>brak zdjęcia</Button>
                        :
                        <React.Fragment>
                            {(props.img==='') ?
                                (<Tooltip key={`tooltip-${result.score}${result.show.name}`}
                                          title={`Powiększ zdjęcie ${result.show.name}`} placement='top-end'>
                                    <div className={classes.mediumImgWrapper}>
                                        <MediumImage result={result} />
                                    </div>
                                </Tooltip>)
                                :
                                (<MediumImage result={result} />)
                            }
                        </React.Fragment>
                    }
                </div>
            </React.Fragment>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        detailedResult: state.setDetailedResultReducer.detailedResult,
        img: state.setOriginalImageReducer.src
    };
};

const mapDispatchToProps = {
    setDetailedResult,
    setOriginalImage
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
