import React from 'react';
import Router from "./Router";
import {useStyles} from "../styles/useStyles";

export default function App() {
    const classes = useStyles();

    return (
        <div className={classes.App}>
            <Router />
        </div>
    );
};
