import React from 'react';
import {styles} from "../../styles/styles";
import {useHistory} from 'react-router-dom';
import {ErrorMsg} from './ErrorMsg';
import Button from '@material-ui/core/Button';

export function ErrorComponent(props) {
    const history = useHistory();
    const classes = styles();

    return (
        <div className={classes.dashboard}>
            <ErrorMsg msg={props.msg} />
            <Button variant='outlined' size='small' onClick={() => history.push('/')}>
                Powrót</Button>
        </div>
    );
};

export default ErrorComponent;
