import React from 'react';
import {useStyles} from '../../styles/styles';

export function ErrorMsg(props) {
    const classes = useStyles();

    return (
        <span className={classes.errorMsg}>{props.msg}</span>
    )
}