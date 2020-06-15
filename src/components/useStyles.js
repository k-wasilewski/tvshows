import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles({
    App: {
        textAlign: 'center',
        fontFamily: 'Lato'
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
        bottom: '10px',
        position: 'fixed',
        right: '10%',
        backgroundColor: 'white',
        boxShadow: '0 0 10px 10px white'
    },
    errorMsg: {
        color: 'red'
    }
});