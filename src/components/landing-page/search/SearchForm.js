import {ErrorMsg} from "../../misc/ErrorMsg";
import React, {useEffect, useRef} from "react";
import {styles} from "../../../styles/styles";
import Button from '@material-ui/core/Button';

export function SearchForm(props) {
    const classes = styles();
    const inputRef = useRef();

    useEffect(() => {
        props.passInputRefToParent(inputRef);
    }, []);     //eslint-disable-line react-hooks/exhaustive-deps

    function onKeyDown(event) {
        if (event.key === 'Enter') {
            props.onSubmit();
        }
    };

    return (
        <form className={classes.dashboard} onSubmit={props.onSubmit}>
            <ErrorMsg msg={props.msg} />
            <input id='searchFormInput' type='text' onChange={props.onChange} className={classes.input} ref={inputRef} />
            <Button type='submit' variant='outlined' size='small' onKeyDown={onKeyDown}>Szukaj</Button>
            <Button variant='outlined' size='small' onClick={props.doReset}>Resetuj wyniki</Button>
        </form>
    );
};