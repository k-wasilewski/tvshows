import {ErrorMsg} from "../../misc/ErrorMsg";
import React from "react";
import {styles} from "../../../styles/styles";
import Button from '@material-ui/core/Button';

export function SearchForm(props) {
    const classes = styles();

    return (
        <div className={classes.dashboard}>
            <ErrorMsg msg={props.msg} />
            <input type='text' onChange={props.onChange} className={classes.input}/>
            <Button variant='outlined' size='small' onClick={props.onSubmit}>Szukaj</Button>
            <Button variant='outlined' size='small' onClick={props.doReset}>Resetuj wyniki</Button>
        </div>
    )
}