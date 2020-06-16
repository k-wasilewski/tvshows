import React from 'react';
import {useStyles} from "../../styles/useStyles";

export function ErrorMsg(props) {
    const classes = useStyles();

    return (
        <span className={classes.errorMsg}>{props.msg}</span>
    )
}