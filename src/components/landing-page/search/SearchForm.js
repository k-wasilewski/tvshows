import {ErrorMsg} from "../../misc/ErrorMsg";
import React from "react";
import {styles} from "../../../styles/styles";

export function SearchForm(props) {
    const classes = styles();

    return (
        <div className={`${classes.searchForm} ${classes.dashboard}`}>
            <ErrorMsg style={{marginTop: '5vh'}} msg={props.msg} />
            <form onSubmit={props.onSubmit} >
                <input type='text' onChange={props.onChange} />
                <button>Szukaj</button>
                <button onClick={props.doReset}>Resetuj</button>
            </form>
        </div>
    )
}