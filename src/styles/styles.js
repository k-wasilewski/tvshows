import {makeStyles} from '@material-ui/core/styles';

const BACKGROUND_COLOR = '#deeaff';

export const styles = makeStyles({
    App: {
        textAlign: 'center',
        fontFamily: 'Lato',
        backgroundColor: BACKGROUND_COLOR,
        minHeight: '100vh'
    },
    blurApp: {
        textAlign: 'center',
        fontFamily: 'Lato',
        backgroundColor: BACKGROUND_COLOR,
        minHeight: '100vh',
        filter: 'blur(4px)'
    },
    logo: {
        top: '5px',
        left: '5px',
        position: 'fixed',
        width: '15vw'
    },
    copyrightLandingPage: {
        bottom: '5px',
        right: '5px',
        position: 'fixed',
        backgroundColor: BACKGROUND_COLOR,
        boxShadow: `0 0 10px 10px ${BACKGROUND_COLOR}`,
        ['@media (max-width:200px)']: {     //eslint-disable-line no-useless-computed-key
            display: 'none'
        }
    },
    copyrightDetails: {
        bottom: '5px',
        right: '5px',
        position: 'fixed',
        backgroundColor: BACKGROUND_COLOR,
        boxShadow: `0 0 10px 10px ${BACKGROUND_COLOR}`,
        ['@media (max-width:340px)']: {     //eslint-disable-line no-useless-computed-key
            display: 'none'
        }
    },
    errorMsg: {
        display: 'block',
        color: 'red',
    },
    query: {
        display: 'block'
    },
    progress: {
        position: 'absolute',
        left: '50%',
        top: '50%'
    },
    hidden: {
        display: 'none'
    },
    detailsHeader: {
        marginTop: 0
    },
    detailsSpan: {
        display: 'block',
        paddingTop: '5vh',
        paddingRight: '5vw'
    },
    dashboard: {
        paddingTop: '10vh',
        textAlign: 'left',
        paddingLeft: '20vw'
    },
    filterLabel: {
        display: 'inline-block',
        paddingTop: '30px'
    },
    formControl: {
        display: 'inline-block'
    },
    input: {
        ['@media (max-width:310px)']: {     //eslint-disable-line no-useless-computed-key
            width: '90%'
        },
        ['@media (max-width:200px)']: {     //eslint-disable-line no-useless-computed-key
            width: '80%'
        }
    },
    mediumImage: {
        cursor: 'pointer'
    },
    mediumImgWrapper: {
        width: '20vw'
    },
    imageWrapperCard: {
        width: '30vw',
        zIndex: 100,
        position: 'absolute',
        top: '10vh',
        left: '35vw'
    },
    imageCard: {
        height: '60vh'
    }
});

export const TABLE_HEAD_STYLE = {
    root: {
        '& *': {
            fontFamily: 'Lato Heavy',
            fontSize: '1.1rem'
        }
    }
};

export const TABLE_ROW_STYLE = {
    root: {
        '&:hover': {
            backgroundColor: 'lightgray',
            cursor: 'pointer'
        }
    }
};

export const TABLE_CELL_STYLE = {
    root: {
        ['@media (max-width:430px)']: {     //eslint-disable-line no-useless-computed-key
            fontSize: '0.7rem'
        },
        ['@media (max-width:370px)']: {     //eslint-disable-line no-useless-computed-key
            fontSize: '0.5rem'
        },
        ['@media (max-width:300px)']: {     //eslint-disable-line no-useless-computed-key
            fontSize: '0.2rem'
        }
    }
};

export const TABLE_STYLE = {
    root: {
        backgroundColor: BACKGROUND_COLOR
    }
};

export const TABLE_CONTAINER_STYLE = {
    root: {
        width: '90vw',
        margin: '0 auto'
    }
};