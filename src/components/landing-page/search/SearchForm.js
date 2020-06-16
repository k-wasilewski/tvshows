import {ErrorMsg} from "../../misc/ErrorMsg";
import React from "react";
import {useStyles} from "../../../styles/styles";

export function SearchForm(props) {
    const classes = useStyles();

    return (
        <div className={classes.searchForm}>
            <ErrorMsg style={{marginTop: '5vh'}} msg={props.msg} />
            <form onSubmit={props.onSubmit} >
                <input type='text' onChange={props.onChange} />
                <button>Szukaj</button>
            </form>
        </div>
    )
}