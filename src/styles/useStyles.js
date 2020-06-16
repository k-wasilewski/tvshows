import {makeStyles} from "@material-ui/core/styles";

export const BACKGROUND_COLOR = '#deeaff';

export const useStyles = makeStyles({
    App: {
        textAlign: 'center',
        fontFamily: 'Lato',
        backgroundColor: BACKGROUND_COLOR,
        height: '100vh'
    },
    tableWrapper: {
        width: '90vw',
        margin: '0 auto'
    },
    tableHead: {
        fontFamily: 'Lato Heavy',
        color: 'red'
    },
    copywright: {
        bottom: '5px',
        right: '5px',
        position: 'fixed',
        backgroundColor: BACKGROUND_COLOR,
        boxShadow: `0 0 10px 10px ${BACKGROUND_COLOR}`
    },
    errorMsg: {
        color: 'red'
    }
});