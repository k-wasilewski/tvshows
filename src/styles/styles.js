import {makeStyles} from '@material-ui/core/styles';

const BACKGROUND_COLOR = '#deeaff';

export const styles = makeStyles({
    App: {
        textAlign: 'center',
        fontFamily: 'Lato',
        backgroundColor: BACKGROUND_COLOR,
        height: '100vh'
    },
    logo: {
        top: '5px',
        left: '5px',
        position: 'fixed',
        width: '15vw'
    },
    copywright: {
        bottom: '5px',
        right: '5px',
        position: 'fixed',
        backgroundColor: BACKGROUND_COLOR,
        boxShadow: `0 0 10px 10px ${BACKGROUND_COLOR}`
    },
    errorMsg: {
        color: 'red',
        marginBottom: '2px'
    },
    hidden: {
        display: 'none'
    },
    detailsHeader: {
        marginTop: 0
    },
    detailsSpan: {
        display: 'block',
        paddingTop: '5vh'
    },
    searchForm: {
        paddingTop: '10vh'
    },
    dashboard: {
        textAlign: 'left',
        paddingLeft: '20vw'
    },
    filterLabel: {
        display: 'inline-block',
        paddingTop: '30px'
    },
    formControl: {
        display: 'inline-block'
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