import {ErrorMsg} from "../../misc/ErrorMsg";
import React from "react";

export function SearchForm(props) {
    return (
        <div>
            <ErrorMsg msg={props.msg} />
            <form onSubmit={props.onSubmit}>
                <input type='text' onChange={props.onChange} />
                <button>Szukaj</button>
            </form>
        </div>
    )
}