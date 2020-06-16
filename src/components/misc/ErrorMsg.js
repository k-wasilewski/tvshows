import React from 'react';
import {styles} from '../../styles/styles';

export function ErrorMsg(props) {
    const classes = styles();

    return (
        <span className={classes.errorMsg}>{props.msg}</span>
    )
}