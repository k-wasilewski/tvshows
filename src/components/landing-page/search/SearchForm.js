import {ErrorMsg} from "../../misc/ErrorMsg";
import React from "react";
import {styles} from "../../../styles/styles";

export function SearchForm(props) {
    const classes = styles();

    return (
        <div className={classes.dashboard}>
            <ErrorMsg msg={props.msg} />
            <form onSubmit={props.onSubmit} >
                <input type='text' onChange={props.onChange} />
                <button>Szukaj</button>
                <button onClick={props.doReset}>Resetuj wyniki</button>
            </form>
        </div>
    )
}